/* @flow */
import type {NextFunction, $Request, $Response} from 'express';
import type { $RequestBodyJson } from 'body-parser';
import type { $RequestPassportBodyJson, $RequestPassport } from 'passport';

import {NotAuthorizedError} from '../../../errors/not-authorized.error';
import passport from 'passport';

export function authorized (req: $RequestPassportBodyJson, res: $Response, next: NextFunction) {
  if (req && req.user && req.user._id && !req.user.disabled) {
    return next();
  }
  return next(new NotAuthorizedError());
}

export function login(req: $RequestBodyJson, res: $Response, next: NextFunction) {
  req.body.email = req.body.email && req.body.email.toLowerCase();
  passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err);
      }
      if (user && !user.disabled) {
        return req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.json({user: user});
        })
      }
      next(new NotAuthorizedError());
    }
  )(req, res, next);
}

export function logout(req: $RequestPassport, res: $Response) {
  req.logout();
  res.json({status: 'ok'});
}

export function info(req: $RequestPassportBodyJson, res: $Response, next: NextFunction) {
  if (!req.user) {
    return next(new NotAuthorizedError());
  }
  return res.json(req.user);
}
