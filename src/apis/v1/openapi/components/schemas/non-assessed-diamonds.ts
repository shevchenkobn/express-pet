import { OpenAPIV3 } from 'openapi-types';
import { DiamondClaritySchema } from './diamond-clarity';
import { DiamondColorSchema } from './diamond-color';
import { DiamondCutSchema } from './diamond-cut';
import { NonNegativeDecimalSchema } from './non-negative-decimal';

export const NonAssessedDiamondSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['carat', 'cut', 'color', 'clarity'],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    carat: NonNegativeDecimalSchema,
    cut: DiamondCutSchema,
    color: DiamondColorSchema,
    clarity: DiamondClaritySchema,
  },
};
