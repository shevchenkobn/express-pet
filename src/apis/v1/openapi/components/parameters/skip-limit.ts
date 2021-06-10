import { OpenAPIV3 } from 'openapi-types';

const schema = {
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
} as OpenAPIV3.SchemaObject;

export const SkipLimitParameter: OpenAPIV3.ParameterObject = {
  name: 'skipLimit',
  in: 'query',
  description:
    'Skip & limit parameters. JSON format is used, style is used to make validator work',
  required: true,
  content: {
    'application/json': {
      schema,
    },
  },
  schema,
  style: 'form',
  explode: true,
};
