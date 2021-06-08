import { NonAssessedDiamond } from '../../../models/assessed-diamond';
import { DiamondsRepository } from '../../../repositories/diamonds.repository';
import { DiamondCalculatorService } from '../../../services/diamond-calculator.service';
export declare class DiamondsCommon {
    private readonly calculator;
    private readonly diamonds;
    constructor(calculator: DiamondCalculatorService, diamonds: DiamondsRepository);
    assessDiamond(nonAssessedDiamond: NonAssessedDiamond): Promise<import("../../../models/assessed-diamond").AssessedDiamond>;
}
