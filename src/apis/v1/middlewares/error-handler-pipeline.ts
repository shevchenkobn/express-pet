import { ErrorRequestHandler } from 'express';
import { logger } from '../../../lib/logger';
import { ErrorCode } from '../errors/codes';
import { LogicError } from '../errors/logic.error';
import { coerceLogicError, isOpenApiFinalError } from '../errors/openapi.error';
import { ServerError } from '../errors/server.error';

export const errorHandlingPipeline: ErrorRequestHandler[] = [
  (err, req, res, next) => {
    if (err instanceof LogicError) {
      switch (err.code) {
        case ErrorCode.SERVER:
        case ErrorCode.SERVER_OPENAPI_RESPONSE_VALIDATION:
          res.status(500);
          break;

        case ErrorCode.NOT_FOUND:
          res.status(404);
          break;

        default:
          res.status(400);
          break;
      }
      res.json(err);
    } else {
      if (err instanceof SyntaxError && err.message.includes('JSON')) {
        res
          .status(400)
          .json(new LogicError(ErrorCode.JSON_BAD, err.message, err));
      } else if (isOpenApiFinalError(err)) {
        const error = coerceLogicError(err);
        res.status(err.status).json(error);
      } else {
        res.status(500).json(new ServerError(ErrorCode.SERVER, err));
      }
    }

    if (
      res.statusCode === 500 &&
      err.code !== ErrorCode.SERVER_OPENAPI_RESPONSE_VALIDATION
    ) {
      logger.error(`Request server error at "${req.url}":`);
      logger.error(err);
    } else {
      logger.debug(`Request error at "${req.url}":`);
      logger.debug(err);
    }
  },
];
