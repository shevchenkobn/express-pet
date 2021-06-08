"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const logic_error_1 = require("./logic.error");
class ServerError extends logic_error_1.LogicError {
    constructor(code, innerError, message) {
        super(code);
        this.innerError = innerError;
        if (message) {
            Object.defineProperty(this, 'message', {
                enumerable: true,
                configurable: false,
                writable: false,
                value: message,
            });
        }
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=server.error.js.map