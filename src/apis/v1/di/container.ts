import { Container } from 'inversify';
import { defaultScope, di } from '../../../di/container';
import { Di } from '../../../lib/di';
import { DiamondsCommon } from '../services/diamonds.common';
import { ApiV1Types } from './api-v1.types';

class ApiV1Di extends Di {
  protected createContainer(): Container {
    const container = di.getContainer().createChild({
      defaultScope,
      autoBindInjectable: true,
    });

    container
      .bind<DiamondsCommon>(ApiV1Types.DiamondsCommon)
      .to(DiamondsCommon);

    return container;
  }

  protected getBaseInitPromise(): Promise<void> {
    return di.getContainerInitPromise();
  }
}

export const apiV1Di = new ApiV1Di();
