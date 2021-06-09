import { inject, injectable } from 'inversify';
import { Types } from '../../../di/types';
import { DeepReadonly } from '../../../lib/types';
import {
  AssessedDiamondNoId,
  cloneAssessedDiamond,
  NonAssessedDiamond,
} from '../../../models/assessed-diamond';
import { DiamondRange } from '../../../models/diamond';
import { DiamondsRepository } from '../../../repositories/diamonds.repository';
import { DiamondCalculatorService } from '../../../services/diamond-calculator.service';
import { SkipLimit } from '../../../services/mongodb-connection.service';

@injectable()
export class DiamondsCommon {
  constructor(
    @inject(Types.DiamondCalculator)
    private readonly calculator: DiamondCalculatorService,
    @inject(Types.DiamondRepository)
    private readonly diamonds: DiamondsRepository
  ) {}

  assessDiamond(nonAssessedDiamond: DeepReadonly<NonAssessedDiamond>) {
    const assessedDiamond = cloneAssessedDiamond(
      nonAssessedDiamond
    ) as AssessedDiamondNoId;
    assessedDiamond.price = this.calculator.calculatePrice(nonAssessedDiamond);
    return this.diamonds.saveAssessedDiamond(assessedDiamond);
  }

  getSimilarDiamonds(
    diamondRange: DeepReadonly<Partial<DiamondRange>>,
    skipLimit: DeepReadonly<SkipLimit>
  ) {
    return this.diamonds.getSimilarDiamonds(diamondRange, skipLimit);
  }

  getAssessedDiamond(id: string) {
    return this.diamonds.getDiamond(id);
  }
}
