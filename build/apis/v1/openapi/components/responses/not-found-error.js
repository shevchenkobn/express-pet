"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundErrorResponse = void 0;
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
                        enum: error_handler_pipeline_1.errorCodes404,
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=not-found-error.js.map