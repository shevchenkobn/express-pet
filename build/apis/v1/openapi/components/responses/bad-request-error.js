"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundErrorResponse = void 0;
const codes_1 = require("../../../errors/codes");
const error_handler_pipeline_1 = require("../../../middlewares/error-handler-pipeline");
exports.NotFoundErrorResponse = {
    description: 'Not Found Error',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['code'],
                properties: {
                    code: {
                        type: 'string',
                        enum: codes_1.validErrorCodes.filter((v) => !error_handler_pipeline_1.errorCodes404.includes(v) && !error_handler_pipeline_1.errorCodes500.includes(v)),
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=bad-request-error.js.map