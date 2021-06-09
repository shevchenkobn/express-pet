"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiError = exports.coerceLogicError = exports.isOpenApiFinalError = void 0;
const codes_1 = require("./codes");
function isOpenApiFinalError(err) {
    return (typeof err === 'object' &&
        err !== null &&
        typeof err.status === 'number' &&
        Array.isArray(err.errors));
}
exports.isOpenApiFinalError = isOpenApiFinalError;
function coerceLogicError(err) {
    const error = err;
    error.code = codes_1.ErrorCode.OpenApiValidation;
    return error;
}
exports.coerceLogicError = coerceLogicError;
class OpenApiError extends Error {
    constructor(openApiError, jsonSchemaError, message) {
        super(message);
        this.openApiError = openApiError;
        this.jsonSchemaError = jsonSchemaError;
    }
}
exports.OpenApiError = OpenApiError;
//# sourceMappingURL=openapi-error.js.map