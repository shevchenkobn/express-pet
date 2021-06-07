import { Sema } from 'async-sema';
import { noop } from 'lodash';

export interface Disposable {
  readonly isDisposed: boolean;

  dispose(): Promise<void>;
}

export function isDisposable(obj: unknown): obj is Disposable {
  const value = obj as any;
  return (
    typeof value.dispose === 'function' && typeof value.isDisposed === 'boolean'
  );
}

export type DisposeFunction = () => any;
export type IsDisposeedUpdaterFunction = () => boolean | Promise<boolean>;

export class Disposer implements Disposable {
  private isDisposedValue: boolean;
  private disposeSemaphore: Sema;
  private doDispose: DisposeFunction;
  private isDisposedUpdater: IsDisposeedUpdaterFunction;

  get isDisposed() {
    return this.isDisposedValue;
  }

  constructor(
    disposer: DisposeFunction = noop,
    isDisposedUpdater: IsDisposeedUpdaterFunction = () => true
  ) {
    this.doDispose = disposer;
    this.isDisposedUpdater = isDisposedUpdater;
    this.isDisposedValue = false;
    this.disposeSemaphore = new Sema(1);
  }

  async dispose(): Promise<void> {
    try {
      await this.disposeSemaphore.acquire();
      if (this.isDisposed) {
        return Promise.resolve();
      }
      await this.doDispose();
      this.isDisposedValue = await this.isDisposedUpdater();
    } finally {
      this.disposeSemaphore.release();
    }
  }
}

export const ASYNC_INIT: unique symbol = Symbol.for('@asyncInit');

export interface AsyncInitializable {
  readonly [ASYNC_INIT]: Promise<any>;
}

export function isAsyncInitializable(obj: any): obj is AsyncInitializable {
  return (
    obj &&
    obj[ASYNC_INIT] instanceof Object &&
    typeof obj[ASYNC_INIT].then === 'function'
  );
}
