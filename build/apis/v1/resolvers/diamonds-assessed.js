"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assessed_diamond_1 = require("../../../models/assessed-diamond");
const api_v1_types_1 = require("../di/api-v1.types");
const openapi_1 = require("../openapi");
const skip_limit_1 = require("../openapi/components/parameters/skip-limit");
const server_error_1 = require("../openapi/components/responses/server-error");
const assessed_diamonds_1 = require("../openapi/components/schemas/assessed-diamonds");
const diamond_range_1 = require("../openapi/components/schemas/diamond-range");
const non_assessed_diamonds_1 = require("../openapi/components/schemas/non-assessed-diamonds");
const utils_1 = require("../utils");
function default_1(di) {
    const pathItemHandler = {};
    const diamondsCommon = di.get(api_v1_types_1.ApiV1Types.DiamondsCommon);
    pathItemHandler.post = async (req, res, next) => {
        try {
            const nonAssessedDiamond = assessed_diamond_1.fromLooseNonAssessedDiamond(req.body);
            const assessedDiamond = await diamondsCommon.assessDiamond(nonAssessedDiamond);
            res.status(200).json(assessedDiamond);
        }
        catch (err) {
            next(err);
        }
    };
    pathItemHandler.post.apiDoc = {
        description: 'Assess diamond',
        tags: [openapi_1.OpenApiTags.Diamonds],
        requestBody: {
            description: 'A diamond to assess',
            content: {
                'application/json': {
                    schema: non_assessed_diamonds_1.NonAssessedDiamondSchema,
                },
            },
            required: true,
        },
        responses: {
            200: {
                description: 'Diamond was assessed',
                content: {
                    'application/json': {
                        schema: assessed_diamonds_1.AssessedDiamondSchema,
                    },
                },
            },
            500: server_error_1.ServerErrorResponse,
        },
    };
    pathItemHandler.get = async (req, res, next) => {
        const filter = utils_1.fromQueryParam(req.query.filter);
        const skipLimit = utils_1.fromQueryParam(req.query.skipLimit);
        diamondsCommon
            .getSimilarDiamonds(filter, skipLimit)
            .then((diamonds) => {
            res.status(200).json(diamonds);
        })
            .catch(next);
    };
    pathItemHandler.get.apiDoc = {
        description: 'Get similar assessed diamond',
        tags: [openapi_1.OpenApiTags.Diamonds],
        parameters: [
            {
                name: 'filter',
                in: 'query',
                description: 'Parameters for query',
                required: true,
                content: {
                    'application/json': {
                        schema: diamond_range_1.DiamondRangeSchema,
                    },
                },
            },
            skip_limit_1.SkipLimitParameter,
        ],
        responses: {
            200: {
                description: 'List of similar assessed diamonds',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['diamonds', 'count'],
                            properties: {
                                diamonds: {
                                    type: 'array',
                                    items: assessed_diamonds_1.AssessedDiamondSchema,
                                },
                                count: {
                                    type: 'integer',
                                    minimum: 0,
                                },
                            },
                        },
                    },
                },
            },
            500: server_error_1.ServerErrorResponse,
        },
    };
    return pathItemHandler;
}
exports.default = default_1;
//# sourceMappingURL=diamonds-assessed.js.map