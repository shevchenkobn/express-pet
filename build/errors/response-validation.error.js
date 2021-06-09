"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseValidationError = void 0;
const codes_1 = require("./codes");
const server_error_1 = require("./server.error");
class ResponseValidationError extends server_error_1.ServerError {
    constructor(validationError, message) {
        super(codes_1.ErrorCode.ServerOpenapiResponseValidation, validationError, message);
    }
}
exports.ResponseValidationError = ResponseValidationError;
//# sourceMappingURL=response-validation.error.js.map