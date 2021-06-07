import { Handler } from 'express';
import { OpenAPIResponseValidatorValidationError } from 'openapi-response-validator';
import { logger } from '../../../lib/logger';
import { Optional } from '../../../lib/types';
import { deserializeResponseBody } from '../../../lib/utils';
import { ResponseValidationError } from '../errors/response-validation.error';
import { OpenApiRequest, OpenApiResponse } from '../openapi/types';

export const validateResponses: Handler = (req, res, next) => {
  const request = req as OpenApiRequest;
  const response = res as OpenApiResponse;

  if (!request.apiDoc) {
    next();
    return;
  }
  const strictValidation =
    !!request.apiDoc['x-express-openapi-response-validation-strict'];
  if (typeof response.validateResponse === 'function') {
    const send = res.send;
    res.send = function expressOpenAPISend(...args) {
      const onlyWarn = !strictValidation;
      if (res.get('x-express-openapi-validation-error-for') !== undefined) {
        return send.apply(res, args);
      }
      const body = deserializeResponseBody(res, args[0]);
      const validation: Optional<
        Partial<OpenAPIResponseValidatorValidationError>
      > = response.validateResponse(
        res.statusCode as any as string,
        body
      ) as any;
      if (!validation) {
        send.apply(res, args);
        return;
      }
      const validationMessage = `Invalid response for status code ${
        res.statusCode
      } for ${req.url}: ${JSON.stringify(validation)}`;
      if (validation.message) {
        Object.defineProperty(validation, 'message', {
          writable: true,
          configurable: false,
          enumerable: true,
          value: validation.message,
        });
      }
      // Set to avoid a loop, and to provide the original status code
      res.set(
        'x-express-openapi-validation-error-for',
        res.statusCode.toString()
      );
      if (onlyWarn) {
        logger.warn(validationMessage);
        send.apply(res, args);
      } else {
        logger.error(validationMessage);
        res.status(500).json(new ResponseValidationError(validation));
      }
    } as typeof send;
  }
  next();
};
