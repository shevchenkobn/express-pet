import Decimal from 'decimal.js';
import { inject, injectable } from 'inversify';
import { Collection, Cursor, FilterQuery, ObjectId, WithId } from 'mongodb';
import { Types } from '../di/types';
import { ErrorCode } from '../errors/codes';
import { EntityNotFoundError } from '../errors/entity-not-found.error';
import { DeepReadonly, Nullable } from '../lib/types';
import {
  AssessedDiamond,
  AssessedDiamondNoId,
  cloneAssessedDiamond,
} from '../models/assessed-diamond';
import { DiamondProperties, DiamondRange } from '../models/diamond';
import {
  decimal128ToDecimal,
  decimalToDecimal128,
  MongodbConnectionService,
  MongoDbDocument,
  SkipLimit,
  toShallowDocument,
} from '../services/mongodb-connection.service';

export const diamondsCollectionName = 'diamonds';

type DiamondDocument = MongoDbDocument<Required<AssessedDiamondNoId>>;

export interface AssessedDiamondList {
  diamonds: AssessedDiamond[];
  count: number;
}

@injectable()
export class DiamondsRepository {
  private readonly collection: Collection<DiamondDocument>;
  constructor(
    @inject(Types.MongoDbConnection)
    private dbConnection: MongodbConnectionService
  ) {
    this.collection = dbConnection.client
      .db(dbConnection.defaultDbName, {
        noListener: false,
        returnNonCachedInstance: false,
      })
      .collection(diamondsCollectionName);
  }

  async saveAssessedDiamond(diamond: DeepReadonly<AssessedDiamondNoId>) {
    const document = toShallowDocument(
      diamond as Required<AssessedDiamondNoId>
    );
    if (!diamond.name) {
      document.name = '';
    }
    const result = await this.collection.insertOne(document);
    const assessedDiamond = cloneAssessedDiamond(diamond) as AssessedDiamond;
    assessedDiamond.id = new ObjectId(result.insertedId).toHexString();
    if (!diamond.name) {
      assessedDiamond.name = '';
    }
    return assessedDiamond;
  }

  /**
   * @throws {EntityNotFoundError<string>}
   * @param {string} id
   * @returns {Promise<Nullable<AssessedDiamond>>}
   */
  getDiamond(id: string): Promise<Nullable<AssessedDiamond>> {
    return this.collection
      .findOne({
        _id: new ObjectId(id),
      })
      .then((document) => {
        if (!document) {
          throw new EntityNotFoundError(id, ErrorCode.AssessedDiamondNotFound);
        }
        return toAssessedDocument(document as WithId<DiamondDocument>);
      });
  }

  async getSimilarDiamonds(
    diamondRange: DeepReadonly<Partial<DiamondRange>>,
    skipLimit: DeepReadonly<SkipLimit>
  ): Promise<AssessedDiamondList> {
    const pagination = Object.assign({ skip: 0 }, skipLimit);
    const query: FilterQuery<MongoDbDocument<DiamondProperties>> = {};
    if (diamondRange.carat) {
      if (diamondRange.carat instanceof Decimal) {
        query.carat = {
          $eq: decimalToDecimal128(diamondRange.carat),
        };
      } else {
        query.carat = {};
        if (diamondRange.carat.min) {
          query.carat.$gte = decimalToDecimal128(diamondRange.carat.min);
        }
        if (diamondRange.carat.max) {
          query.carat.$lte = decimalToDecimal128(diamondRange.carat.max);
        }
      }
    }
    for (const key of ['cut', 'color', 'clarity'] as Exclude<
      keyof MongoDbDocument<DiamondProperties>,
      'carat'
    >[]) {
      if (key in diamondRange) {
        query[key] = {
          $eq: diamondRange[key] as any,
        };
      }
    }
    const cursor = this.collection.find(query);
    const [diamonds, count] = await Promise.all([
      DiamondsRepository.loadList(
        cursor.clone().skip(pagination.skip).limit(pagination.limit)
      ),
      cursor.count(),
    ]);
    return { diamonds, count };
  }

  private static async loadList(cursor: Cursor<DiamondDocument>) {
    const diamonds: AssessedDiamond[] = [];
    for await (const document of cursor as Cursor<WithId<DiamondDocument>>) {
      diamonds.push(toAssessedDocument(document));
    }
    return diamonds;
  }
}

function toAssessedDocument(
  document: WithId<DiamondDocument>
): AssessedDiamond {
  return {
    id: document._id.toHexString(),
    name: document.name,
    price: decimal128ToDecimal(document.price),
    carat: decimal128ToDecimal(document.carat),
    cut: document.cut,
    color: document.color,
    clarity: document.clarity,
  };
}
