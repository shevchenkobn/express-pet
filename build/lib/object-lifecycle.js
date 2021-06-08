"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAsyncInitializable = exports.ASYNC_INIT = exports.Disposer = exports.isDisposable = void 0;
const async_sema_1 = require("async-sema");
const lodash_1 = require("lodash");
function isDisposable(obj) {
    const value = obj;
    return (typeof value.dispose === 'function' && typeof value.isDisposed === 'boolean');
}
exports.isDisposable = isDisposable;
class Disposer {
    constructor(disposer = lodash_1.noop, isDisposedUpdater = () => true) {
        this.doDispose = disposer;
        this.isDisposedUpdater = isDisposedUpdater;
        this.isDisposedValue = false;
        this.disposeSemaphore = new async_sema_1.Sema(1);
    }
    get isDisposed() {
        return this.isDisposedValue;
    }
    async dispose() {
        try {
            await this.disposeSemaphore.acquire();
            if (this.isDisposed) {
                return Promise.resolve();
            }
            await this.doDispose();
            this.isDisposedValue = await this.isDisposedUpdater();
        }
        finally {
            this.disposeSemaphore.release();
        }
    }
}
exports.Disposer = Disposer;
exports.ASYNC_INIT = Symbol.for('@asyncInit');
function isAsyncInitializable(obj) {
    return (obj &&
        obj[exports.ASYNC_INIT] instanceof Object &&
        typeof obj[exports.ASYNC_INIT].then === 'function');
}
exports.isAsyncInitializable = isAsyncInitializable;
//# sourceMappingURL=object-lifecycle.js.map