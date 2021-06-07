import { BindingScopeEnum, Container } from 'inversify';
import { IDisposable } from '../lib/object-lifecycle';
import { Nullable } from '../lib/types';

const defaultScope = BindingScopeEnum.Singleton;

let container: Nullable<Container> = null;
let disposeCallbacks: IDisposable[] = [];

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

  for (const disposer of disposeCallbacks) {
    await disposer.dispose();
  }
  disposeCallbacks = [];
  initPromise = null;
  container = null;
}

let initPromise: Nullable<Promise<void>> = null;
export function getContainerInitPromise() {
  return initPromise ?? Promise.resolve();
}

function createContainer(): Container {
  const container = new Container({
    defaultScope,
    autoBindInjectable: true,
  });

  return container;
}
