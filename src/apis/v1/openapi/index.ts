import bodyParser from 'body-parser';
import {
  OpenAPIRequestValidatorArgs,
  OpenAPIRequestValidatorError,
} from 'openapi-request-validator';
import { Express } from 'express';
import { ExpressOpenAPIArgs } from 'express-openapi';
import { OpenAPIV3 } from 'openapi-types';
import * as path from 'path';
import { isNotProduction } from '../../../lib/config';
import { logger } from '../../../lib/logger';
import { OpenapiError } from '../errors/openapi.error';

export function getOpenApiOptions(
  app: Express,
  apiDoc: OpenAPIV3.Document
): ExpressOpenAPIArgs {
  return {
    app,
    apiDoc,
    logger,
    consumesMiddleware: {
      'application/json': bodyParser.json({
        strict: false,
      }),
    },
    errorTransformer: errorTransformer as any,
    enableObjectCoercion: true,
    exposeApiDocs: true,
    paths: getOpenApiResolversBasePath(),
    pathsIgnore: /\.(spec|test)$/,
    promiseMode: true,
    validateApiDoc: isNotProduction(),
  };
}

export function getOpenApiResolversBasePath() {
  return path.join(__dirname, '../openapi/resolvers/');
}

// FIXME: check, why ErrorObject is missing dataPath in this case
export const errorTransformer: OpenAPIRequestValidatorArgs['errorTransformer'] =
  (openApiError, ajvError) => {
    return new OpenapiError(openApiError, ajvError as any);
  };

export function getOpenApiDoc(): OpenAPIV3.Document {
  return {
    openapi: '3.0.3',
    info: {
      title: 'Simple Express shop',
      version: '1.0.0',
    },
    servers: [
      {
        url: '/api/v1',
        description:
          'The server will be served from the same host as this document.',
      },
    ],
    tags: [
      {
        name: 'diamonds',
        description: 'API to manage diamond estimations.',
      },
    ],
    paths: {}, // Will be built from sources.
  };
}
