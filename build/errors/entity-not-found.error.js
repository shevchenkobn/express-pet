"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundError = void 0;
const codes_1 = require("./codes");
const logic_error_1 = require("./logic.error");
class EntityNotFoundError extends logic_error_1.LogicError {
    constructor(entityId, code = codes_1.ErrorCode.NotFound, message, innerError) {
        super(code, message, innerError);
        this.entityId = entityId;
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
//# sourceMappingURL=entity-not-found.error.js.map