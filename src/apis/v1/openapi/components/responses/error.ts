import { OpenAPIV3 } from 'openapi-types';
import { validErrorCodes } from '../../../errors/codes';

export const ErrorResponse: OpenAPIV3.ResponseObject = {
  description: 'General Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['code'],
        properties: {
          code: {
            type: 'string',
            enum: validErrorCodes,
          },
        },
      },
    },
  },
};
