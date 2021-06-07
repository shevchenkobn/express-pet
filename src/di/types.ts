// NOTE: Make sure to import it in every entry point you have
import 'reflect-metadata';
import { decorate, injectable } from 'inversify';

export const TYPES = {
  MongoDbConnectionString: Symbol.for('MongoDbConnectionString'),
  MongoDbConnection: Symbol.for('MongoDbConnection'),
};

const injectables = new Set<any>();
/**
 * Decorate third-party type without source code as @injectable
 * @param type
 */
export function ensureInjectable(type: any) {
  if (injectables.has(type)) {
    return;
  }
  decorate(injectable(), type);
  injectables.add(type);
}
