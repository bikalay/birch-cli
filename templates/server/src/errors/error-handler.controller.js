/* @flow */
// noinspection ES6CheckImport
import type {NextFunction, $Request, $Response} from 'express';

import {ERROR_TYPES, ValidationError, BadRequestError} from './';

export type ResErrorStatus = {
  status: number,
  error: Error | string
};

export class MongoError extends Error {
  errors: {[string]: {message: string, path: string}};
  code: number;
}

export function handleErrors(err: Error, req: $Request, res: $Response, next: NextFunction) {
  if(err) {
    console.error(err);
    const errStatus = parseError(err);
    return res.status(errStatus.status).json(err);
  }
  return next();
}

export function parseError (err: Error | MongoError | ValidationError): ResErrorStatus {
  switch (err.name) {
    case ERROR_TYPES.MONGO_ERROR:
      err = parseMongoError(err);
      return parseError(err);
    case ERROR_TYPES.VALIDATION_ERROR:
      if(err.errors) {
        err = parseValidationError(err);
        return parseError(err);
      }
      return {status: 400, error: err.message, fieldName: err.fieldName ? err.fieldName: ''};
    case ERROR_TYPES.BAD_REQUEST_ERROR:
      return {status: 400, error: err.message};
    case ERROR_TYPES.NOT_AUTHORIZED_ERROR:
      return {status: 401, error: err.message};
    case ERROR_TYPES.NOT_PERMITTED_ERROR:
      return {status: 403, error: err.message};
    case ERROR_TYPES.NOT_FOUND_ERROR:
      return {status: 404, error: err.message};
    default:
      return {status: 500, error: err.message || err};
  }
}

export function parseValidationError(err: Error | MongoError): Error {
  if(err.errors) {
    const errors: {[string]: {message: string, path: string}} = (err.errors: any);
    let keys = Object.keys(errors);
    if(keys.length>0) {
      let _err = errors[keys[0]];
      return new ValidationError(_err.message, _err.path);
    }
  }
  return new Error(err.message);
}

export function parseMongoError(err: Error | MongoError | ValidationError): Error {
  if(err.code) {
    switch (err.code) {
      case 11000:
        let field = err.message.split("index:")[1];
        field = field.split(" dup key")[0];
        field = field.substring(0, field.lastIndexOf("_"));
        return new BadRequestError(`Invalid ${field} or already taken`);
      default:
        return new Error(err.message);
    }
  }
  return new Error(err.message);
}


