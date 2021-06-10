import { OpenAPIV3 } from 'openapi-types';
import {
  notFoundErrorCodes,
  serverErrorCodes,
  validErrorCodes,
} from '../../../../../errors/codes';

export const BadRequestErrorResponse: OpenAPIV3.ResponseObject = {
  description: 'Bad Request Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['code'],
        properties: {
          code: {
            type: 'string',
            enum: validErrorCodes.filter(
              (v) =>
                !notFoundErrorCodes.includes(v) && !serverErrorCodes.includes(v)
            ),
          },
        },
        additionalProperties: true,
      },
    },
  },
};
