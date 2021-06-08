import { OpenAPIV3 } from 'openapi-types';

export const ObjectIdSchema: OpenAPIV3.SchemaObject = {
  type: 'string',
  description: 'Object ID',
  pattern: '^[a-fA-F\\d]{24}$',
};
