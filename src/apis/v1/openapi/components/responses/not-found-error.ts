import { OpenAPIV3 } from 'openapi-types';
import { notFoundErrorCodes } from '../../../../../errors/codes';

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
            enum: notFoundErrorCodes,
          },
          entityId: {
            description: 'Not Found Entity ID if some entity was requested',
          },
        },
        additionalProperties: true,
      },
    },
  },
};
