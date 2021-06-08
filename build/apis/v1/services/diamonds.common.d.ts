import { DeepReadonly } from '../../../lib/types';
import { NonAssessedDiamond } from '../../../models/assessed-diamond';
import { DiamondRange } from '../../../models/diamond';
import { DiamondsRepository } from '../../../repositories/diamonds.repository';
import { DiamondCalculatorService } from '../../../services/diamond-calculator.service';
import { SkipLimit } from '../../../services/mongodb-connection.service';
export declare class DiamondsCommon {
    private readonly calculator;
    private readonly diamonds;
    constructor(calculator: DiamondCalculatorService, diamonds: DiamondsRepository);
    assessDiamond(nonAssessedDiamond: DeepReadonly<NonAssessedDiamond>): Promise<import("../../../models/assessed-diamond").AssessedDiamond>;
    getSimilarDiamonds(diamondRange: DeepReadonly<Partial<DiamondRange>>, skipLimit: DeepReadonly<SkipLimit>): Promise<import("../../../repositories/diamonds.repository").AssessedDiamondList>;
    getAssessedDiamond(id: string): Promise<import("../../../models/assessed-diamond").AssessedDiamond>;
}
