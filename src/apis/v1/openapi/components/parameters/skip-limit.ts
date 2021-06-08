import { OpenAPIV3 } from 'openapi-types';

export const SkipLimitParameter: OpenAPIV3.ParameterObject = {
  name: 'skipLimit',
  in: 'query',
  description: 'Skip & limit parameters',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['limit'],
        properties: {
          skip: {
            type: 'integer',
            minimum: 0,
          },
          limit: {
            type: 'integer',
            minimum: 0,
            maximum: 100,
          },
        },
      },
    },
  },
};
