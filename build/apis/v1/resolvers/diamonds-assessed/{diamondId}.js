"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_v1_types_1 = require("../../di/api-v1.types");
const openapi_1 = require("../../openapi");
const error_1 = require("../../openapi/components/responses/error");
const server_error_1 = require("../../openapi/components/responses/server-error");
const object_id_1 = require("../../openapi/components/schemas/object-id");
const utils_1 = require("../../utils");
function default_1(di) {
    const paramName = utils_1.getParamNameFromScriptName(__filename);
    const pathItemHandler = {
        parameters: [
            {
                in: 'path',
                name: 'diamondId',
                schema: object_id_1.ObjectIdSchema,
                required: true,
            },
        ],
    };
    const diamondsCommon = di.get(api_v1_types_1.ApiV1Types.DiamondsCommon);
    pathItemHandler.get = async (req, res, next) => {
        diamondsCommon
            .getAssessedDiamond(req.params[paramName])
            .then((diamond) => {
            res.status(200).json(diamond);
        })
            .catch(next);
    };
    pathItemHandler.get.apiDoc = {
        description: 'Get Assessed Diamond',
        tags: [openapi_1.OpenApiTags.Diamonds],
        responses: {
            200: {
                description: 'Assessed Diamond',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                        },
                    },
                },
            },
            404: error_1.ErrorResponse,
            500: server_error_1.ServerErrorResponse,
        },
    };
    return pathItemHandler;
}
exports.default = default_1;
//# sourceMappingURL=%7BdiamondId%7D.js.map