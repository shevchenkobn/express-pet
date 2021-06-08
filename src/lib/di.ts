import { Container, interfaces } from 'inversify';
import {
  ASYNC_INIT,
  isAsyncInitializable,
  isDisposable,
} from './object-lifecycle';
import { Nullable } from './types';
import ServiceIdentifier = interfaces.ServiceIdentifier;

export abstract class Di {
  protected container: Nullable<Container> = null;
  protected disposeCallbacks: ServiceIdentifier<any>[] = [];
  protected initPromise: Nullable<Promise<void>> = null;
  protected asyncInitServices: ServiceIdentifier<any>[] = [];

  get isContainerCreated() {
    return !!this.container;
  }

  getContainer() {
    if (!this.container) {
      this.container = this.createContainer();
    }
    return this.container;
  }

  async disposeContainer() {
    if (!this.container) {
      return;
    }

    for (const id of this.disposeCallbacks) {
      const disposer = this.container.get(id);
      if (isDisposable(disposer)) {
        await disposer.dispose();
      }
    }
    this.container.unload();
    this.container.unbindAll();
    this.disposeCallbacks = [];
    this.asyncInitServices = [];
    this.initPromise = null;
    this.container = null;
  }

  getContainerInitPromise() {
    if (!this.container) {
      return Promise.resolve();
    }
    if (!this.initPromise) {
      this.initPromise = this.getBaseInitPromise();
      for (const id of this.asyncInitServices) {
        const obj = this.container.get(id);
        if (isAsyncInitializable(obj)) {
          this.initPromise = this.initPromise.then(() => obj[ASYNC_INIT]);
        }
      }
    }

    return this.initPromise;
  }

  protected getBaseInitPromise() {
    return Promise.resolve();
  }

  protected abstract createContainer(): Container;
}
