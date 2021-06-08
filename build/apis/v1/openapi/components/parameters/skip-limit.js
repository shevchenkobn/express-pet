"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipLimitParameter = void 0;
exports.SkipLimitParameter = {
    name: 'skipLimit',
    in: 'query',
    description: 'Skip & limit parameters',
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['limit'],
                properties: {
                    skip: {
                        type: 'integer',
                        minimum: 0,
                    },
                    limit: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 100,
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=skip-limit.js.map