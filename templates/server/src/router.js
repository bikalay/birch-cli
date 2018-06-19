/* @flow */
import type {$Application, $Request, $Response, NextFunction} from 'express';

import api from './api/api.router';
import {NotFoundError} from './errors';

export function router(app: $Application) {
  app.use('/api', api);
  app.use((req: $Request, res: $Response, next: NextFunction) => next(new NotFoundError()));
}
