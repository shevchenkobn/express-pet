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
    'Skip & limit parameters.\n**JSON format is used by `content` property; `schema`, `style` & `explode` properties can be removed**',
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
