"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Di = void 0;
const object_lifecycle_1 = require("./object-lifecycle");
class Di {
    constructor() {
        this.container = null;
        this.disposeCallbacks = [];
        this.initPromise = null;
        this.asyncInitServices = [];
    }
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
            if (object_lifecycle_1.isDisposable(disposer)) {
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
                if (object_lifecycle_1.isAsyncInitializable(obj)) {
                    this.initPromise = this.initPromise.then(() => obj[object_lifecycle_1.ASYNC_INIT]);
                }
            }
        }
        return this.initPromise;
    }
    getBaseInitPromise() {
        return Promise.resolve();
    }
}
exports.Di = Di;
//# sourceMappingURL=di.js.map