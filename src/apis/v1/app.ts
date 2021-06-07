import cors from 'cors';
import express from 'express';
import { initialize } from 'express-openapi';
import { OpenAPIV3 } from 'openapi-types';
import { getContainer, getContainerInitPromise } from '../../di/container';
import { isNotProduction } from '../../lib/config';
import { logger } from '../../lib/logger';
import { errorHandlingPipeline } from './middlewares/error-handler-pipeline';
import { notFoundHandler } from './middlewares/not-found.middleware';
import { validateResponses } from './middlewares/validate-responses.middleware';
import { getOpenApiDoc, getOpenApiOptions } from './openapi';

export async function createApp() {
  const app = express();
  app.use(
    cors({
      origin: true,
    })
  );

  const apiDoc = getOpenApiDoc() as OpenAPIV3.Document & Record<string, any>;
  apiDoc['x-express-openapi-disable-defaults-middleware'] = true;
  if (isNotProduction()) {
    apiDoc['x-express-openapi-disable-response-validation-middleware'] = false;
    apiDoc['x-express-openapi-response-validation-strict'] = true;
    apiDoc['x-express-openapi-additional-middleware'] = [validateResponses];
    logger.info('Response OpenApi validation is enabled');
  } else {
    apiDoc['x-express-openapi-disable-response-validation-middleware'] = true;
  }

  const openapiFramework = initialize(getOpenApiOptions(app, apiDoc));

  app.use(errorHandlingPipeline);
  app.use(notFoundHandler);

  // TODO: add child container
  const container = getContainer();
  await getContainerInitPromise();

  return { app, openapi: openapiFramework };
}
