"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondsRepository = exports.diamondsCollectionName = void 0;
const inversify_1 = require("inversify");
const mongodb_1 = require("mongodb");
const types_1 = require("../di/types");
const assessed_diamond_1 = require("../models/assessed-diamond");
const mongodb_connection_service_1 = require("../services/mongodb-connection.service");
exports.diamondsCollectionName = 'diamonds';
let DiamondsRepository = class DiamondsRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
        this.collection = dbConnection.client
            .db(dbConnection.defaultDbName, {
            noListener: false,
            returnNonCachedInstance: false,
        })
            .collection(exports.diamondsCollectionName);
    }
    async saveAssessedDiamond(diamond) {
        const document = mongodb_connection_service_1.toShallowDocument(diamond);
        if (!diamond.name) {
            document.name = '';
        }
        const result = await this.collection.insertOne(document);
        const assessedDiamond = assessed_diamond_1.cloneAssessedDiamond(diamond);
        assessedDiamond.id = new mongodb_1.ObjectId(result.insertedId).toHexString();
        if (!diamond.name) {
            assessedDiamond.name = '';
        }
        return assessedDiamond;
    }
};
DiamondsRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.Types.MongoDbConnection)),
    __metadata("design:paramtypes", [mongodb_connection_service_1.MongodbConnectionService])
], DiamondsRepository);
exports.DiamondsRepository = DiamondsRepository;
//# sourceMappingURL=diamonds.repository.js.map