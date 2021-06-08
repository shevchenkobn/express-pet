"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicError = void 0;
class LogicError extends TypeError {
    constructor(code, message, innerError) {
        if (!message) {
            super(code);
        }
        else {
            super(message);
        }
        this.code = code;
        if (innerError !== undefined) {
            this.innerError = innerError;
        }
    }
}
exports.LogicError = LogicError;
//# sourceMappingURL=logic.error.js.map