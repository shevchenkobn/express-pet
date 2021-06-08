import { OpenAPIV3 } from 'openapi-types';
import { DiamondColor } from '../../../../../models/diamond';

export const DiamondColorSchema: OpenAPIV3.SchemaObject = {
  type: 'string',
  description: 'Diamond color',
  enum: Object.values(DiamondColor),
};
