import { BindingScopeEnum, Container } from 'inversify';
import { config } from '../lib/config';
import { Di } from '../lib/di';
import { DiamondsRepository } from '../repositories/diamonds.repository';
import { DiamondCalculatorService } from '../services/diamond-calculator.service';
import { MongodbConnectionService } from '../services/mongodb-connection.service';
import { Types } from './types';

export const defaultScope = BindingScopeEnum.Singleton;

class MainDi extends Di {
  protected createContainer(): Container {
    const container = new Container({
      defaultScope,
      autoBindInjectable: true,
    });

    container
      .bind<string>(Types.MongoDbConnectionString)
      .toConstantValue(config.mongoDbUrl);

    container
      .bind<MongodbConnectionService>(Types.MongoDbConnection)
      .to(MongodbConnectionService);
    this.asyncInitServices.push(Types.MongoDbConnection);
    this.disposeCallbacks.push(Types.MongoDbConnection);

    container
      .bind<DiamondsRepository>(Types.DiamondRepository)
      .to(DiamondsRepository);

    container
      .bind<DiamondCalculatorService>(Types.DiamondCalculator)
      .to(DiamondCalculatorService);

    return container;
  }
}

export const di = new MainDi();
