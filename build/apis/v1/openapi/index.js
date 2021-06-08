"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenApiDoc = exports.apiPrefix = exports.OpenApiTags = exports.errorTransformer = exports.getOpenApiResolversBasePath = exports.getOpenApiOptions = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const path = __importStar(require("path"));
const config_1 = require("../../../lib/config");
const logger_1 = require("../../../lib/logger");
const openapi_error_1 = require("../errors/openapi.error");
function getOpenApiOptions(app, apiDoc, di) {
    return {
        app,
        apiDoc,
        logger: logger_1.logger,
        consumesMiddleware: {
            'application/json': body_parser_1.default.json({
                strict: false,
            }),
        },
        dependencies: {
            di,
        },
        errorTransformer: exports.errorTransformer,
        enableObjectCoercion: true,
        exposeApiDocs: true,
        docsPath: '/api-docs',
        paths: getOpenApiResolversBasePath(),
        pathsIgnore: /\.(spec|test)$/,
        promiseMode: true,
        validateApiDoc: config_1.isNotProduction(),
    };
}
exports.getOpenApiOptions = getOpenApiOptions;
function getOpenApiResolversBasePath() {
    return path.join(__dirname, '../resolvers/');
}
exports.getOpenApiResolversBasePath = getOpenApiResolversBasePath;
const errorTransformer = (openApiError, ajvError) => {
    return new openapi_error_1.OpenapiError(openApiError, ajvError);
};
exports.errorTransformer = errorTransformer;
var OpenApiTags;
(function (OpenApiTags) {
    OpenApiTags["Diamonds"] = "diamonds";
})(OpenApiTags = exports.OpenApiTags || (exports.OpenApiTags = {}));
exports.apiPrefix = '/api/v1';
function getOpenApiDoc(originUrl = '') {
    return {
        openapi: '3.0.3',
        info: {
            title: 'Simple Express shop',
            version: '1.0.0',
        },
        servers: [
            {
                url: exports.apiPrefix,
                description: 'API prefix',
            },
            {
                url: '{originUrl}' + exports.apiPrefix,
                description: 'Deployment URL',
                variables: {
                    originUrl: {
                        description: 'Origin URL',
                        default: originUrl,
                    },
                },
            },
        ],
        tags: [
            {
                name: OpenApiTags.Diamonds,
                description: 'API to manage diamond estimations.',
            },
        ],
        paths: {},
    };
}
exports.getOpenApiDoc = getOpenApiDoc;
//# sourceMappingURL=index.js.map