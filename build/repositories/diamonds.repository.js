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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var DiamondsRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondsRepository = exports.diamondsCollectionName = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
const inversify_1 = require("inversify");
const mongodb_1 = require("mongodb");
const types_1 = require("../di/types");
const assessed_diamond_1 = require("../models/assessed-diamond");
const mongodb_connection_service_1 = require("../services/mongodb-connection.service");
exports.diamondsCollectionName = 'diamonds';
let DiamondsRepository = DiamondsRepository_1 = class DiamondsRepository {
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
    getDiamond(id) {
        return this.collection
            .findOne({
            _id: new mongodb_1.ObjectId(id),
        })
            .then((document) => document
            ? toAssessedDocument(document)
            : null);
    }
    async getSimilarDiamonds(diamondRange, skipLimit) {
        const pagination = Object.assign({ skip: 0 }, skipLimit);
        const query = {};
        if (diamondRange.carat) {
            if (diamondRange.carat instanceof decimal_js_1.default) {
                query.carat = {
                    $eq: mongodb_connection_service_1.decimalToDecimal128(diamondRange.carat),
                };
            }
            else {
                query.carat = {};
                if (diamondRange.carat.min) {
                    query.carat.$gte = mongodb_connection_service_1.decimalToDecimal128(diamondRange.carat.min);
                }
                if (diamondRange.carat.max) {
                    query.carat.$lte = mongodb_connection_service_1.decimalToDecimal128(diamondRange.carat.max);
                }
            }
        }
        for (const key of ['cut', 'color', 'clarity']) {
            if (key in diamondRange) {
                query[key] = {
                    $eq: diamondRange[key],
                };
            }
        }
        console.log(query);
        const cursor = this.collection.find(query);
        const [diamonds, count] = await Promise.all([
            DiamondsRepository_1.loadList(cursor.clone().skip(pagination.skip).limit(pagination.limit)),
            cursor.count(),
        ]);
        return { diamonds, count };
    }
    static async loadList(cursor) {
        var e_1, _a;
        const diamonds = [];
        try {
            for (var _b = __asyncValues(cursor), _c; _c = await _b.next(), !_c.done;) {
                const document = _c.value;
                diamonds.push(toAssessedDocument(document));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return diamonds;
    }
};
DiamondsRepository = DiamondsRepository_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.Types.MongoDbConnection)),
    __metadata("design:paramtypes", [mongodb_connection_service_1.MongodbConnectionService])
], DiamondsRepository);
exports.DiamondsRepository = DiamondsRepository;
function toAssessedDocument(document) {
    return {
        id: document._id.toHexString(),
        name: document.name,
        price: mongodb_connection_service_1.decimal128ToDecimal(document.price),
        carat: mongodb_connection_service_1.decimal128ToDecimal(document.carat),
        cut: document.cut,
        color: document.color,
        clarity: document.clarity,
    };
}
//# sourceMappingURL=diamonds.repository.js.map