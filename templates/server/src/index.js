/* @flow */

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {BODY_SIZE_LIMIT, PORT} from './properties';
import {dbUrl, initTestUser} from './db/mongo';
import {initializeSession} from './session';
import {handleErrors} from './errors/error-handler.controller';
import passport from './auth';
import {router} from './router';

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({
  extended: true,
  limit: BODY_SIZE_LIMIT
}));

app.use(bodyParser.json({
  limit: BODY_SIZE_LIMIT
}));

const session = initializeSession(dbUrl);

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

router(app);

app.use(handleErrors);

initTestUser();

app.listen(PORT, function () {
  console.info('\nServer ready on port %d\n', PORT);
});
