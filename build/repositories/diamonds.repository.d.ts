import { AssessedDiamond, AssessedDiamondNoId } from '../models/assessed-diamond';
import { MongodbConnectionService } from '../services/mongodb-connection.service';
export declare const diamondsCollectionName = "diamonds";
export declare class DiamondsRepository {
    private dbConnection;
    private readonly collection;
    constructor(dbConnection: MongodbConnectionService);
    saveAssessedDiamond(diamond: AssessedDiamondNoId): Promise<AssessedDiamond>;
}
