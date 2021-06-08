import { OpenAPIV3 } from 'openapi-types';
import { isNotProduction } from '../../../../../lib/config';
import { ErrorCode } from '../../../errors/codes';
import { errorCodes500 } from '../../../middlewares/error-handler-pipeline';

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
            enum: isNotProduction() ? errorCodes500 : [ErrorCode.Server],
          },
          id: {},
        },
      },
    },
  },
};
