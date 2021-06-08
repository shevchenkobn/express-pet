import { Container } from 'inversify';
import { fromLooseNonAssessedDiamond } from '../../../models/assessed-diamond';
import { ApiV1Types } from '../di/api-v1.types';
import { OpenApiPathItemHandler, OpenApiTags } from '../openapi';
import { AssessedDiamondSchema } from '../openapi/components/schemas/assessed-diamonds';
import { NonAssessedDiamondSchema } from '../openapi/components/schemas/non-assessed-diamonds';
import { DiamondsCommon } from '../services/diamonds.common';

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
    const nonAssessedDiamond = fromLooseNonAssessedDiamond(req.body);
    const assessedDiamond = await diamondsCommon.assessDiamond(
      nonAssessedDiamond
    );
    res.status(200).json(assessedDiamond);
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
    },
  };

  return pathItemHandler;
}
