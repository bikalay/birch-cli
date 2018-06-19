/* @flow */
import passport from 'passport';
import LocalStrategy from 'passport-local';
import {User} from './db/schemas/user.schema';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (username, password, done) => {
  User.findOne({email: username}, function (err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Invalid Login' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Invalid Login' });
    }
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.update({_id: id}, {$set: {lastLogin: Date.now()}}, false, (err, res) => {
    if (err) { return done(err); }
    User.findById(id, '-salt -hashed_password', function(err, user) {
      if (err) { return done(err); }
      return done(err, user);
    });
  })
});

export default passport;


