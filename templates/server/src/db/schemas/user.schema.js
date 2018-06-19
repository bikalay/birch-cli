/* @flow */
import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import crypto from 'crypto';
import type {MongooseDocument} from 'mongoose';

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'E-mail is incorrect'
  }),
  validate({
    validator: 'isLowercase',
    message: 'E-mail should be in lower case characters'
  })
];

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: emailValidator,
    trim: true
  },
  name: {
    first: String,
    last: String,
    suffix: String
  },
  hashed_password: String,
  salt: String,
  disabled: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  inviteCode: {
    type: String,
    index: {unique: true, sparse: true}
  },
  needChangePassword: Boolean
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true
});

UserSchema.virtual('password').set(function (password) {
  this.salt = this.makeSalt();
  this.hashed_password = this.hashPassword(password);
}).get(function () {
  return this.hashed_password;
});

UserSchema.methods = {

  validPassword: function (password) {
    return this.hashPassword(password) === this.hashed_password;
  },
  /**
   * Make salt
   * @return {String}
   * @api public
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Hash password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  hashPassword: function (password) {
    if (!password || !this.salt) return '';
    const salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
  },

  /**
   * Hide security sensitive fields
   *
   * @returns {*|Array|Binary|Object}
   */
  toJSON: function () {
    const obj = this.toObject();
    delete obj.hashed_password;
    delete obj.salt;
    delete obj.password;
    delete obj.resetPasswordToken;
    delete obj.resetPasswordExpires;
    return obj;
  }

};

export const User = mongoose.model('User', UserSchema);

export type UserDocument =  MongooseDocument & {
  email: string;
  name: { first: string, last: string};
}
