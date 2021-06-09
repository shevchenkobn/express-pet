"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResponses = void 0;
const logger_1 = require("../../../lib/logger");
const utils_1 = require("../../../lib/utils");
const response_validation_error_1 = require("../../../errors/response-validation.error");
const validateResponses = (req, res, next) => {
    const request = req;
    const response = res;
    if (!request.apiDoc) {
        next();
        return;
    }
    const strictValidation = !!request.apiDoc['x-express-openapi-response-validation-strict'];
    if (typeof response.validateResponse === 'function') {
        const send = res.send;
        res.send = function expressOpenAPISend(...args) {
            const onlyWarn = !strictValidation;
            if (res.get('x-express-openapi-validation-error-for') !== undefined) {
                return send.apply(res, args);
            }
            const body = utils_1.deserializeResponseBody(res, args[0]);
            const validation = response.validateResponse(res.statusCode, body);
            if (!validation) {
                send.apply(res, args);
                return;
            }
            const validationMessage = `Invalid response for status code ${res.statusCode} for ${req.url}: ${JSON.stringify(validation)}`;
            if (validation.message) {
                Object.defineProperty(validation, 'message', {
                    writable: true,
                    configurable: false,
                    enumerable: true,
                    value: validation.message,
                });
            }
            res.set('x-express-openapi-validation-error-for', res.statusCode.toString());
            if (onlyWarn) {
                logger_1.logger.warn(validationMessage);
                send.apply(res, args);
            }
            else {
                logger_1.logger.error(validationMessage);
                res.status(500).json(new response_validation_error_1.ResponseValidationError(validation));
            }
        };
    }
    next();
};
exports.validateResponses = validateResponses;
//# sourceMappingURL=validate-responses.middleware.js.map