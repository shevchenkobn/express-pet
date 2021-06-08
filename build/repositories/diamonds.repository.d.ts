import { DeepReadonly, Nullable } from '../lib/types';
import { AssessedDiamond, AssessedDiamondNoId } from '../models/assessed-diamond';
import { DiamondRange } from '../models/diamond';
import { MongodbConnectionService, SkipLimit } from '../services/mongodb-connection.service';
export declare const diamondsCollectionName = "diamonds";
export interface AssessedDiamondList {
    diamonds: AssessedDiamond[];
    count: number;
}
export declare class DiamondsRepository {
    private dbConnection;
    private readonly collection;
    constructor(dbConnection: MongodbConnectionService);
    saveAssessedDiamond(diamond: DeepReadonly<AssessedDiamondNoId>): Promise<AssessedDiamond>;
    getDiamond(id: string): Promise<Nullable<AssessedDiamond>>;
    getSimilarDiamonds(diamondRange: DeepReadonly<Partial<DiamondRange>>, skipLimit: DeepReadonly<SkipLimit>): Promise<AssessedDiamondList>;
    private static loadList;
}
