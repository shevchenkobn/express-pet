"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundErrorResponse = void 0;
const codes_1 = require("../../../../../errors/codes");
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
                        enum: codes_1.notFoundErrorCodes,
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=not-found-error.js.map