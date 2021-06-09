"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicError = void 0;
const serialize_error_1 = require("serialize-error");
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
    asJsonObject(debug = false) {
        if (!debug) {
            return this;
        }
        const data = serialize_error_1.serializeError(this);
        data.name = this.constructor.name;
        return data;
    }
}
exports.LogicError = LogicError;
//# sourceMappingURL=logic.error.js.map