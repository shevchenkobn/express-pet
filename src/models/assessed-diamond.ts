import Decimal from 'decimal.js';
import { DiamondProperties } from './diamond';

export interface AssessedDiamond extends AssessedDiamondNoId {
  id: string;
  name: string;
}

export interface AssessedDiamondNoId extends NonAssessedDiamond {
  price: Decimal;
}

export interface NonAssessedDiamond extends DiamondProperties {
  name?: string;
}

export function cloneAssessedDiamond<
  T extends NonAssessedDiamond | AssessedDiamondNoId | AssessedDiamond =
    | NonAssessedDiamond
    | AssessedDiamondNoId
    | AssessedDiamond
>(diamond: T): T {
  return { ...diamond };
}

export function fromLooseNonAssessedDiamond(obj: any): NonAssessedDiamond {
  const diamond = {
    carat: new Decimal(obj.carat),
    cut: obj.cut.toLowerCase(),
    color: obj.color.toLowerCase(),
    clarity: obj.clarity.toLowerCase(),
  } as NonAssessedDiamond;
  if ('name' in obj) {
    diamond.name = obj.name;
  }
  return diamond;
}
// id: obj.id.toLowerCase(),
//   price: new Decimal(obj.price)
