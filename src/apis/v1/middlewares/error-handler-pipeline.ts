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
        case ErrorCode.Server:
        case ErrorCode.ServerOpenapiResponseValidation:
          res.status(500);
          break;

        case ErrorCode.NotFound:
        case ErrorCode.AssessedDiamondNotFound:
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
          .json(new LogicError(ErrorCode.JsonBad, err.message, err));
      } else if (isOpenApiFinalError(err)) {
        const error = coerceLogicError(err);
        res.status(err.status).json(error);
      } else {
        res.status(500).json(new ServerError(ErrorCode.Server, err));
      }
    }

    if (
      res.statusCode === 500 &&
      err.code !== ErrorCode.ServerOpenapiResponseValidation
    ) {
      logger.error(`Request server error at "${req.url}":`);
      logger.error(err);
    } else {
      logger.debug(`Request error at "${req.url}":`);
      logger.debug(err);
    }
  },
];
