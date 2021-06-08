import Decimal from 'decimal.js';
import { DeepReadonly } from '../lib/types';
import { DiamondProperties } from '../models/diamond';
export declare class DiamondCalculatorService {
    private readonly cutFactors;
    private readonly getCalculationTable;
    calculatePrice(diamond: DeepReadonly<DiamondProperties>): Decimal;
}
