import { inject, injectable } from 'inversify';
import { Collection, ObjectId } from 'mongodb';
import { Types } from '../di/types';
import {
  AssessedDiamond,
  AssessedDiamondNoId,
  cloneAssessedDiamond,
} from '../models/assessed-diamond';
import {
  MongodbConnectionService,
  toShallowDocument,
} from '../services/mongodb-connection.service';

export const diamondsCollectionName = 'diamonds';

@injectable()
export class DiamondsRepository {
  private readonly collection: Collection;
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

  async saveAssessedDiamond(diamond: AssessedDiamondNoId) {
    const document = toShallowDocument(diamond);
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
}
