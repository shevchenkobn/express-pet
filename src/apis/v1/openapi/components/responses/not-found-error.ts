import { OpenAPIV3 } from 'openapi-types';
import { errorCodes404 } from '../../../middlewares/error-handler-pipeline';

export const NotFoundErrorResponse: OpenAPIV3.ResponseObject = {
  description: 'Not Found Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['code'],
        properties: {
          code: {
            type: 'string',
            enum: errorCodes404,
          },
        },
      },
    },
  },
};
