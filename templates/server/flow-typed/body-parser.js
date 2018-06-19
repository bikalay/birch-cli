/* @flow */

import type { $Request } from 'express';

declare module 'body-parser' {
  declare export type $RequestBodyJson = $Request & {body: {[key: string]: mixed}};
  declare export type $RequestBodyText = $Request & {body: string | Object};
  declare export type $RequestBodyRaw = $Request & {body: Buffer | Object};
  declare module.exports: {
    json: (any)=>any,
    urlencoded: (any)=>any,
  }
}
