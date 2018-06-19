/* @flow */
import mongoose from 'mongoose';
import {DB_HOST, DB_NAME, DB_PORT} from '../properties';
import {User} from './schemas/user.schema';

const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

mongoose.Promise = Promise;

mongoose.connect(mongoUrl);

export const dbUrl = mongoUrl;

export function initTestUser() {
  new User({email: 'test@test.com', password: '123456'})
    .save()
    .catch(err => {}); //TODO: test user
}


