// NOTE: Make sure to import it in every entry point you have
import 'reflect-metadata';
import { decorate, injectable } from 'inversify';

export const Types = {
  MongoDbConnectionString: Symbol.for('MongoDbConnectionString'),
  MongoDbConnection: Symbol.for('MongoDbConnection'),

  DiamondCalculator: Symbol.for('DiamondCalculator'),

  DiamondRepository: Symbol.for('DiamondRepository'),
};

const injectables = new Set<any>();
/**
 * Decorate third-party type without source code access as @injectable
 * @param type
 */
export function ensureInjectable(type: any) {
  if (injectables.has(type)) {
    return;
  }
  decorate(injectable(), type);
  injectables.add(type);
}
