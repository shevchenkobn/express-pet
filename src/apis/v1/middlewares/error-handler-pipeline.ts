import { ErrorRequestHandler } from 'express';
import { ErrorCode } from '../../../errors/codes';
import { LogicError } from '../../../errors/logic.error';
import {
  coerceLogicError,
  isOpenApiFinalError,
} from '../../../errors/openapi-error';
import { ServerError } from '../../../errors/server.error';
import { isNotProduction } from '../../../lib/config';
import { logger } from '../../../lib/logger';

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
      res.json(err.asJsonObject(isNotProduction()));
    } else {
      if (err instanceof SyntaxError && err.message.includes('JSON')) {
        res
          .status(400)
          .json(new LogicError(ErrorCode.JsonBad, err.message, err));
      } else if (isOpenApiFinalError(err)) {
        const error = coerceLogicError(err);
        res.status(err.status).json(error);
      } else {
        res
          .status(500)
          .json(
            new ServerError(ErrorCode.Server, err).asJsonObject(
              isNotProduction()
            )
          );
      }
    }

    if (Math.floor(res.statusCode / 100) === 5) {
      const errorMessage = `error at "${req.url}":`;
      logger.error(
        (err.code !== ErrorCode.ServerOpenapiResponseValidation
          ? 'Request server '
          : 'Request response validation') + errorMessage
      );
      logger.error(err);
    } else {
      logger.debug(`Request error at "${req.url}":`);
      logger.debug(err);
    }
  },
];
