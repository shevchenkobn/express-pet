"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
const codes_1 = require("../../../errors/codes");
exports.ErrorResponse = {
    description: 'General Error',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['code'],
                properties: {
                    code: {
                        type: 'string',
                        enum: codes_1.validErrorCodes,
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=error.js.map