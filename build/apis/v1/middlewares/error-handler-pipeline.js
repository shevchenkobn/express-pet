"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlingPipeline = void 0;
const codes_1 = require("../../../errors/codes");
const logic_error_1 = require("../../../errors/logic.error");
const openapi_error_1 = require("../../../errors/openapi-error");
const server_error_1 = require("../../../errors/server.error");
const config_1 = require("../../../lib/config");
const logger_1 = require("../../../lib/logger");
exports.errorHandlingPipeline = [
    (err, req, res, next) => {
        if (err instanceof logic_error_1.LogicError) {
            switch (err.code) {
                case codes_1.ErrorCode.Server:
                case codes_1.ErrorCode.ServerOpenapiResponseValidation:
                    res.status(500);
                    break;
                case codes_1.ErrorCode.NotFound:
                case codes_1.ErrorCode.AssessedDiamondNotFound:
                    res.status(404);
                    break;
                default:
                    res.status(400);
                    break;
            }
            res.json(err.asJsonObject(config_1.isNotProduction()));
        }
        else {
            if (err instanceof SyntaxError && err.message.includes('JSON')) {
                res
                    .status(400)
                    .json(new logic_error_1.LogicError(codes_1.ErrorCode.JsonBad, err.message, err));
            }
            else if (openapi_error_1.isOpenApiFinalError(err)) {
                const error = openapi_error_1.coerceLogicError(err);
                res.status(err.status).json(error);
            }
            else {
                res
                    .status(500)
                    .json(new server_error_1.ServerError(codes_1.ErrorCode.Server, err).asJsonObject(config_1.isNotProduction()));
            }
        }
        if (Math.floor(res.statusCode / 100) === 5) {
            const errorMessage = `error at "${req.url}":`;
            logger_1.logger.error((err.code !== codes_1.ErrorCode.ServerOpenapiResponseValidation
                ? 'Request server '
                : 'Request response validation') + errorMessage);
            logger_1.logger.error(err);
        }
        else {
            logger_1.logger.debug(`Request error at "${req.url}":`);
            logger_1.logger.debug(err);
        }
    },
];
//# sourceMappingURL=error-handler-pipeline.js.map