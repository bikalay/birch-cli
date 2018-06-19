/* @flow */
import express from 'express';
import auth from './auth/auth.router';
import {authorized} from '../api/auth/controllers/auth.controller';

const router = express.Router();

router.use('/auth', auth);

export default router;
