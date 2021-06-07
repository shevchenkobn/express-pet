import { Response } from 'express';
import { extension } from 'mime';
import { logger } from './logger';

export function deserializeResponseBody(res: Response, body: any) {
  if (typeof body !== 'string') {
    return body;
  }
  const type = extension(res.get('Content-Type').split(/;\s*/)[0]);
  switch (type) {
    case 'json':
      return JSON.parse(body);
    default:
      logger.warn(`Unexpected body type: ${type}. Returning string`);
      return body;
  }
}
