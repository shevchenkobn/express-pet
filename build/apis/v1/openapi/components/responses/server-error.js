"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerErrorResponse = void 0;
const config_1 = require("../../../../../lib/config");
const codes_1 = require("../../../../../errors/codes");
exports.ServerErrorResponse = {
    description: 'Server Error',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['code'],
                properties: {
                    code: {
                        type: 'string',
                        enum: config_1.isNotProduction() ? codes_1.serverErrorCodes : [codes_1.ErrorCode.Server],
                    },
                    id: {},
                },
            },
        },
    },
};
//# sourceMappingURL=server-error.js.map