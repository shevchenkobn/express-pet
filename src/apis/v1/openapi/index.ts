import bodyParser from 'body-parser';
import { Container } from 'inversify';
import { OpenAPIRequestValidatorArgs } from 'openapi-request-validator';
import { Express } from 'express';
import { ExpressOpenAPIArgs, Operation } from 'express-openapi';
import { OpenAPIV3 } from 'openapi-types';
import * as path from 'path';
import { isNotProduction } from '../../../lib/config';
import { logger } from '../../../lib/logger';
import { OpenapiError } from '../errors/openapi.error';

export interface OpenApiPathItemHandler {
  parameters?: OpenAPIV3.ParameterObject[];
  summary?: string;
  description?: string;
  get?: Operation;
  put?: Operation;
  post?: Operation;
  delete?: Operation;
  options?: Operation;
  head?: Operation;
  patch?: Operation;
}

export function getOpenApiOptions(
  app: Express,
  apiDoc: OpenAPIV3.Document,
  di: Container
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
    dependencies: {
      di,
    },
    errorTransformer: errorTransformer as any,
    enableObjectCoercion: true,
    exposeApiDocs: true,
    docsPath: '/api-docs',
    paths: getOpenApiResolversBasePath(),
    pathsIgnore: /\.(spec|test)$/,
    promiseMode: true,
    validateApiDoc: isNotProduction(),
  };
}

export function getOpenApiResolversBasePath() {
  return path.join(__dirname, '../resolvers/');
}

// FIXME: check, why ErrorObject is missing dataPath in this case
export const errorTransformer: OpenAPIRequestValidatorArgs['errorTransformer'] =
  (openApiError, ajvError) => {
    return new OpenapiError(openApiError, ajvError as any);
  };

export enum OpenApiTags {
  Diamonds = 'diamonds',
}

export const apiPrefix = '/api/v1';

export function getOpenApiDoc(originUrl = ''): OpenAPIV3.Document {
  return {
    openapi: '3.0.3',
    info: {
      title: 'Simple Express shop',
      version: '1.0.0',
    },
    servers: [
      {
        url: apiPrefix,
        description: 'API prefix',
      },
      {
        url: '{originUrl}' + apiPrefix,
        description: 'Deployment URL',
        variables: {
          originUrl: {
            description: 'Origin URL',
            default: originUrl,
          },
        },
      },
    ],
    tags: [
      {
        name: OpenApiTags.Diamonds,
        description: 'API to manage diamond estimations.',
      },
    ],
    paths: {}, // Will be built from sources.
  };
}
