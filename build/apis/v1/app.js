"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_openapi_1 = require("express-openapi");
const config_1 = require("../../lib/config");
const exit_handler_1 = require("../../lib/exit-handler");
const logger_1 = require("../../lib/logger");
const container_1 = require("./di/container");
const error_handler_pipeline_1 = require("./middlewares/error-handler-pipeline");
const not_found_middleware_1 = require("./middlewares/not-found.middleware");
const validate_responses_middleware_1 = require("./middlewares/validate-responses.middleware");
const openapi_1 = require("./openapi");
async function createApp(urlOrigin = '') {
    const app = express_1.default();
    app.use(cors_1.default({
        origin: true,
    }));
    const apiDoc = openapi_1.getOpenApiDoc(urlOrigin);
    apiDoc['x-express-openapi-disable-defaults-middleware'] = true;
    if (config_1.isNotProduction()) {
        apiDoc['x-express-openapi-disable-response-validation-middleware'] = false;
        apiDoc['x-express-openapi-response-validation-strict'] = true;
        apiDoc['x-express-openapi-additional-middleware'] = [validate_responses_middleware_1.validateResponses];
        logger_1.logger.info('Response OpenApi validation is enabled');
    }
    else {
        apiDoc['x-express-openapi-disable-response-validation-middleware'] = true;
    }
    const container = container_1.apiV1Di.getContainer();
    await container_1.apiV1Di.getContainerInitPromise();
    exit_handler_1.bindOnExitHandler(() => {
        return container_1.apiV1Di.disposeContainer();
    });
    const openapiFramework = express_openapi_1.initialize(openapi_1.getOpenApiOptions(app, apiDoc, container));
    app.use(error_handler_pipeline_1.errorHandlingPipeline);
    app.use(not_found_middleware_1.notFoundHandler);
    return { app, openapi: openapiFramework };
}
exports.createApp = createApp;
//# sourceMappingURL=app.js.map