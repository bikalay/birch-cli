/* @flow */

import session from 'express-session';
import createStore from 'connect-mongodb-session';
import {SESSION_AGE} from './properties';

const SessionStore = createStore(session);

export function initializeSession(dbUrl: string) {
  const store = new SessionStore({
    uri: dbUrl,
    collection: 'sessions'
  });

  store.on('error', function(error) {
    if(error) {
      console.error(error);
    }
  });

  return session({
    secret: 'secret',
    cookie: {
      maxAge: SESSION_AGE
    },
    store: store,
    resave: true,
    saveUninitialized: true
  });
}
