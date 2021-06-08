import { OpenAPIV3 } from 'openapi-types';
import { DiamondCut } from '../../../../../models/diamond';

export const DiamondCutSchema: OpenAPIV3.SchemaObject = {
  type: 'string',
  description: 'Diamond cut',
  enum: Object.values(DiamondCut),
};
