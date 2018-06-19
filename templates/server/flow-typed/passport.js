/* @flow */

import type { $RequestBodyJson, $RequestBodyText, $RequestBodyRaw } from 'body-parser';
import type {UserDocument} from '../src/db/schemas/user.schema';
import type {$Request, $Response, NextFunction} from 'express';

declare type passport$Request = {
  user: UserDocument;
}

declare module 'passport' {
  declare export type $RequestPassportBodyJson = $RequestBodyJson & passport$Request;
  declare export type $RequestPassportBodyText = $RequestBodyText & passport$Request;
  declare export type $RequestPassportBodyRaw = $RequestBodyRaw & passport$Request;
  declare export type $RequestPassport = $Request & passport$Request;

  declare module.exports: {
    authenticate: (
      policy: string,
      callback: (err: Error, user: UserDocument) => void
    ) => (
      req: $RequestPassportBodyJson,
      res: $Response,
      next: NextFunction
      ) => void,
    logout: () => void,
    use: (any) => void,
    serializeUser: (cb: (user: UserDocument, done: (err: ?Error, result: any)=> void)=>void)=>void,
    deserializeUser: (cb: (id: string, done: (err: Error, result: any)=> void)=>void)=>void,
    initialize: ()=>any,
    session: ()=>any,
  }
}
