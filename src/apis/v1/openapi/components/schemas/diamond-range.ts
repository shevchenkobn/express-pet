import { OpenAPIV3 } from 'openapi-types';
import { DiamondClaritySchema } from './diamond-clarity';
import { DiamondColorSchema } from './diamond-color';
import { DiamondCutSchema } from './diamond-cut';
import { NonNegativeDecimalSchema } from './non-negative-decimal';

export const DiamondRangeSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    carat: {
      oneOf: [
        NonNegativeDecimalSchema,
        {
          type: 'object',
          properties: {
            min: NonNegativeDecimalSchema,
            max: NonNegativeDecimalSchema,
          },
          minProperties: 1,
          additionalProperties: false,
        },
      ],
    },
    cut: DiamondCutSchema,
    color: DiamondColorSchema,
    clarity: DiamondClaritySchema,
  },
  minProperties: 1,
  additionalProperties: false,
};
