import { inject, injectable } from 'inversify';
import { Types } from '../../../di/types';
import {
  AssessedDiamondNoId,
  cloneAssessedDiamond,
  NonAssessedDiamond,
} from '../../../models/assessed-diamond';
import { DiamondsRepository } from '../../../repositories/diamonds.repository';
import { DiamondCalculatorService } from '../../../services/diamond-calculator.service';

@injectable()
export class DiamondsCommon {
  constructor(
    @inject(Types.DiamondCalculator)
    private readonly calculator: DiamondCalculatorService,
    @inject(Types.DiamondRepository)
    private readonly diamonds: DiamondsRepository
  ) {}

  assessDiamond(nonAssessedDiamond: NonAssessedDiamond) {
    const assessedDiamond = cloneAssessedDiamond(
      nonAssessedDiamond
    ) as AssessedDiamondNoId;
    assessedDiamond.price = this.calculator.calculatePrice(nonAssessedDiamond);
    return this.diamonds.saveAssessedDiamond(assessedDiamond);
  }
}
