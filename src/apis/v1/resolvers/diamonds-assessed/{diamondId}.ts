import { Container } from 'inversify';
import { ApiV1Types } from '../../di/api-v1.types';
import { OpenApiPathItemHandler, OpenApiTags } from '../../openapi';
import { ErrorResponse } from '../../openapi/components/responses/error';
import { ServerErrorResponse } from '../../openapi/components/responses/server-error';
import { ObjectIdSchema } from '../../openapi/components/schemas/object-id';
import { DiamondsCommon } from '../../services/diamonds.common';
import { getParamNameFromScriptName } from '../../utils';

export default function (di: Container) {
  const paramName = getParamNameFromScriptName(__filename);

  const pathItemHandler: OpenApiPathItemHandler = {
    parameters: [
      {
        in: 'path',
        name: 'diamondId',
        schema: ObjectIdSchema,
        required: true,
      },
    ],
  };

  const diamondsCommon = di.get<DiamondsCommon>(ApiV1Types.DiamondsCommon);

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
    tags: [OpenApiTags.Diamonds],
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
      404: ErrorResponse,
      500: ServerErrorResponse,
    },
  };
  return pathItemHandler;
}
