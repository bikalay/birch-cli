/* @flow */
import express from 'express';
import {
  login,
  info,
  logout,
  authorized
} from './controllers/auth.controller';

const router = express.Router();
/**
 * @api {post} /api/v1/login Login user
 * @apiName Login
 * @apiVersion 1.0.0
 * @apiGroup Auth
 *
 * @apiParam {String} email User unique email (required).
 * @apiParam {String} password User password (required).
 *
 * @apiSuccess {String} token User auth token.
 */
router.post('/login', login);
/**
 * @api {get} /api/v1/logout Logout user
 * @apiName Logout
 * @apiVersion 1.0.0
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization Users unique token
 */
router.get('/logout', logout);

/**
 * @api {get} /api/v1/info Get current user info
 * @apiName UserInfo
 * @apiVersion 1.0.0
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization Users unique token
 */
router.get('/info', authorized, info);

export default router;
