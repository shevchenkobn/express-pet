import { OpenAPIV3 } from 'openapi-types';
import { DiamondClarity } from '../../../../../models/diamond';

export const DiamondClaritySchema: OpenAPIV3.SchemaObject = {
  type: 'string',
  description: 'Diamond clarity',
  enum: Object.values(DiamondClarity),
};
