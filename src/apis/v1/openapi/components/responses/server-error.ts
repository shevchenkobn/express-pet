import { OpenAPIV3 } from 'openapi-types';
import { isNotProduction } from '../../../../../lib/config';
import { ErrorCode, serverErrorCodes } from '../../../../../errors/codes';

export const ServerErrorResponse: OpenAPIV3.ResponseObject = {
  description: 'Server Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['code'],
        properties: {
          code: {
            type: 'string',
            enum: isNotProduction() ? serverErrorCodes : [ErrorCode.Server],
          },
        },
        additionalProperties: true,
      },
    },
  },
};
