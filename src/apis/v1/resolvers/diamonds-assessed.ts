import { Container } from 'inversify';
import { fromLooseNonAssessedDiamond } from '../../../models/assessed-diamond';
import { DiamondRange } from '../../../models/diamond';
import { SkipLimit } from '../../../services/mongodb-connection.service';
import { ApiV1Types } from '../di/api-v1.types';
import { OpenApiPathItemHandler, OpenApiTags } from '../openapi';
import { SkipLimitParameter } from '../openapi/components/parameters/skip-limit';
import { ServerErrorResponse } from '../openapi/components/responses/server-error';
import { AssessedDiamondSchema } from '../openapi/components/schemas/assessed-diamonds';
import { DiamondRangeSchema } from '../openapi/components/schemas/diamond-range';
import { NonAssessedDiamondSchema } from '../openapi/components/schemas/non-assessed-diamonds';
import { DiamondsCommon } from '../services/diamonds.common';
import { fromQueryParam } from '../utils';

export default function (di: Container) {
  const pathItemHandler: OpenApiPathItemHandler = {};

  const diamondsCommon = di.get<DiamondsCommon>(ApiV1Types.DiamondsCommon);

  /* Example
{
  "name": "First one",
  "carat": "3.1415926535898",
  "cut": "cushion",
  "color": "d",
  "clarity": "fl"
}
   */
  pathItemHandler.post = async (req, res, next) => {
    try {
      const nonAssessedDiamond = fromLooseNonAssessedDiamond(req.body);
      const assessedDiamond = await diamondsCommon.assessDiamond(
        nonAssessedDiamond
      );
      res.status(200).json(assessedDiamond);
    } catch (err) {
      next(err);
    }
  };
  pathItemHandler.post.apiDoc = {
    description: 'Assess diamond',
    tags: [OpenApiTags.Diamonds],
    requestBody: {
      description: 'A diamond to assess',
      content: {
        'application/json': {
          schema: NonAssessedDiamondSchema,
        },
      },
      required: true,
    },
    responses: {
      200: {
        description: 'Diamond was assessed',
        content: {
          'application/json': {
            schema: AssessedDiamondSchema,
          },
        },
      },
      500: ServerErrorResponse,
    },
  };

  pathItemHandler.get = async (req, res, next) => {
    const filter = fromQueryParam<DiamondRange>(req.query.filter as string);
    const skipLimit = fromQueryParam<SkipLimit>(req.query.skipLimit as string);
    diamondsCommon
      .getSimilarDiamonds(filter, skipLimit)
      .then((diamonds) => {
        res.status(200).json(diamonds);
      })
      .catch(next);
  };
  pathItemHandler.get.apiDoc = {
    description: 'Get similar assessed diamond',
    tags: [OpenApiTags.Diamonds],
    parameters: [
      {
        name: 'filter',
        in: 'query',
        description: 'Parameters for query',
        required: true,
        content: {
          'application/json': {
            schema: DiamondRangeSchema,
          },
        },
      },
      SkipLimitParameter,
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
                  items: AssessedDiamondSchema,
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
      500: ServerErrorResponse,
    },
  };

  return pathItemHandler;
}
