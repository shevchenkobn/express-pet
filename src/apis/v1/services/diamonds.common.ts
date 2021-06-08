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
import { ErrorCode } from '../errors/codes';
import { EntityNotFoundError } from '../errors/entity-not-found.error';

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

  async getAssessedDiamond(id: string) {
    const diamond = await this.diamonds.getDiamond(id);
    if (!diamond) {
      throw new EntityNotFoundError(id, ErrorCode.AssessedDiamondNotFound);
    }
    return diamond;
  }
}
