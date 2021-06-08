import { OpenAPIV3 } from 'openapi-types';

export const NonNegativeDecimalSchema: OpenAPIV3.SchemaObject = {
  type: 'string',
  description: 'Non negative decimal with max precision',
  pattern: '^\\d+(\\.\\d+)?$',
};
