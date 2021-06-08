export interface Disposable {
    readonly isDisposed: boolean;
    dispose(): Promise<void>;
}
export declare function isDisposable(obj: unknown): obj is Disposable;
export declare type DisposeFunction = () => any;
export declare type IsDisposeedUpdaterFunction = () => boolean | Promise<boolean>;
export declare class Disposer implements Disposable {
    private isDisposedValue;
    private disposeSemaphore;
    private doDispose;
    private isDisposedUpdater;
    get isDisposed(): boolean;
    constructor(disposer?: DisposeFunction, isDisposedUpdater?: IsDisposeedUpdaterFunction);
    dispose(): Promise<void>;
}
export declare const ASYNC_INIT: unique symbol;
export interface AsyncInitializable {
    readonly [ASYNC_INIT]: Promise<any>;
}
export declare function isAsyncInitializable(obj: any): obj is AsyncInitializable;
