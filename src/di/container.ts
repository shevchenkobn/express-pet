import { BindingScopeEnum, Container, interfaces } from 'inversify';
import { config } from '../lib/config';
import {
  ASYNC_INIT,
  isAsyncInitializable,
  isDisposable,
} from '../lib/object-lifecycle';
import { Nullable } from '../lib/types';
import { MongodbConnectionService } from '../services/mongodb-connection.service';
import { TYPES } from './types';
import ServiceIdentifier = interfaces.ServiceIdentifier;

const defaultScope = BindingScopeEnum.Singleton;

let container: Nullable<Container> = null;
let disposeCallbacks: ServiceIdentifier<any>[] = [];

export function isContainerCreated() {
  return !!container;
}

export function getContainer() {
  if (!container) {
    container = createContainer();
  }
  return container;
}

export async function disposeContainer() {
  if (!container) {
    return;
  }
  container.unload();
  container.unbindAll();

  for (const id of disposeCallbacks) {
    const disposer = container.get(id);
    if (isDisposable(disposer)) {
      await disposer.dispose();
    }
  }
  disposeCallbacks = [];
  asyncInitServices = [];
  initPromise = null;
  container = null;
}

let initPromise: Nullable<Promise<void>> = null;
export function getContainerInitPromise() {
  if (!container) {
    return Promise.resolve();
  }
  if (!initPromise) {
    initPromise = Promise.resolve();
    for (const id of asyncInitServices) {
      const obj = container.get(id);
      if (isAsyncInitializable(obj)) {
        initPromise.then(() => obj[ASYNC_INIT]);
      }
    }
  }
  return initPromise;
}

let asyncInitServices: ServiceIdentifier<any>[] = [];
function createContainer(): Container {
  const container = new Container({
    defaultScope,
    autoBindInjectable: true,
  });

  container
    .bind<string>(TYPES.MongoDbConnectionString)
    .toConstantValue(config.mongoDbUrl);
  container
    .bind<MongodbConnectionService>(TYPES.MongoDbConnection)
    .to(MongodbConnectionService);
  asyncInitServices.push(MongodbConnectionService);

  return container;
}
