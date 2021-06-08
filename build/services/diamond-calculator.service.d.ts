import Decimal from 'decimal.js';
import { DiamondProperties } from '../models/diamond';
export declare class DiamondCalculatorService {
    private readonly cutFactors;
    private readonly getCalculationTable;
    calculatePrice(diamond: DiamondProperties): Decimal;
}
