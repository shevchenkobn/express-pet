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
export declare function cloneAssessedDiamond<T extends NonAssessedDiamond | AssessedDiamondNoId | AssessedDiamond = NonAssessedDiamond | AssessedDiamondNoId | AssessedDiamond>(diamond: T): T;
export declare function fromLooseNonAssessedDiamond(obj: any): NonAssessedDiamond;
