import cors from 'cors';
import express from 'express';
import { initialize } from 'express-openapi';
import { OpenAPIV3 } from 'openapi-types';
import { isNotProduction } from '../../lib/config';
import { bindOnExitHandler } from '../../lib/exit-handler';
import { logger } from '../../lib/logger';
import { apiV1Di } from './di/container';
import { errorHandlingPipeline } from './middlewares/error-handler-pipeline';
import { notFoundHandler } from './middlewares/not-found.middleware';
import { validateResponses } from './middlewares/validate-responses.middleware';
import { getOpenApiDoc, getOpenApiOptions } from './openapi';

export async function createApp(urlOrigin = '') {
  const app = express();
  app.use(
    cors({
      origin: true,
    })
  );

  const apiDoc = getOpenApiDoc(urlOrigin) as OpenAPIV3.Document &
    Record<string, any>;
  apiDoc['x-express-openapi-disable-defaults-middleware'] = true;
  if (isNotProduction()) {
    apiDoc['x-express-openapi-disable-response-validation-middleware'] = false;
    apiDoc['x-express-openapi-response-validation-strict'] = true;
    apiDoc['x-express-openapi-additional-middleware'] = [validateResponses];
    logger.info('Response OpenApi validation is enabled');
  } else {
    apiDoc['x-express-openapi-disable-response-validation-middleware'] = true;
  }

  const container = apiV1Di.getContainer();
  await apiV1Di.getContainerInitPromise();
  bindOnExitHandler(() => {
    return apiV1Di.disposeContainer();
  });

  const openapiFramework = initialize(
    getOpenApiOptions(app, apiDoc, container)
  );

  app.use(errorHandlingPipeline);
  app.use(notFoundHandler);

  return { app, openapi: openapiFramework };
}
