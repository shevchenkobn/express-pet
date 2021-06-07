import { Sema } from 'async-sema';
import { noop } from 'lodash';

export interface IDisposable {
  readonly isDisposed: boolean;

  dispose(): Promise<void>;
}

export function isDisposable(obj: unknown): obj is IDisposable {
  const value = obj as any;
  return (
    typeof value.dispose === 'function' && typeof value.isDisposed === 'boolean'
  );
}

export type DisposeFunction = () => any;

export class Disposer implements IDisposable {
  private _isDisposedValue: boolean;
  private disposeSemaphore: Sema;
  private doDispose: DisposeFunction;

  get isDisposed() {
    return this._isDisposedValue;
  }

  constructor(disposer: DisposeFunction = noop) {
    this.doDispose = disposer;
    this._isDisposedValue = false;
    this.disposeSemaphore = new Sema(1);
  }

  async dispose(): Promise<void> {
    try {
      await this.disposeSemaphore.acquire();
      if (this.isDisposed) {
        return Promise.resolve();
      }
      await this.doDispose();
      this._isDisposedValue = true;
    } finally {
      this.disposeSemaphore.release();
    }
  }
}

export const ASYNC_INIT: unique symbol = Symbol.for('@asyncInit');

export interface IAsyncInitializable {
  readonly [ASYNC_INIT]: Promise<any>;
}
