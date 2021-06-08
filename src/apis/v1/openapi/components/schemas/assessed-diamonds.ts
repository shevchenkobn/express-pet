import { OpenAPIV3 } from 'openapi-types';
import { NonNegativeDecimalSchema } from './non-negative-decimal';
import { NonAssessedDiamondSchema } from './non-assessed-diamonds';
import { ObjectIdSchema } from './object-id';

export const AssessedDiamondSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  required: [...NonAssessedDiamondSchema.required!, 'id', 'name', 'price'],
  properties: {
    ...NonAssessedDiamondSchema.properties,
    id: ObjectIdSchema,
    price: NonNegativeDecimalSchema,
  },
};
