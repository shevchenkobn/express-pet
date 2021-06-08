import { OpenAPIV3 } from 'openapi-types';
import { validErrorCodes } from '../../../errors/codes';
import {
  errorCodes404,
  errorCodes500,
} from '../../../middlewares/error-handler-pipeline';

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
            enum: validErrorCodes.filter(
              (v) => !errorCodes404.includes(v) && !errorCodes500.includes(v)
            ),
          },
        },
      },
    },
  },
};
