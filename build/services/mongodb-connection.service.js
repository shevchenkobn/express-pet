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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimal128ToDecimal = exports.decimalToDecimal128 = exports.toShallowDocument = exports.MongodbConnectionService = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
const inversify_1 = require("inversify");
const mongodb_1 = require("mongodb");
const url_1 = require("url");
const types_1 = require("../di/types");
const logger_1 = require("../lib/logger");
const object_lifecycle_1 = require("../lib/object-lifecycle");
let MongodbConnectionService = class MongodbConnectionService {
    constructor(connectionString) {
        this.client = new mongodb_1.MongoClient(connectionString, {
            useUnifiedTopology: true,
            promiseLibrary: Promise,
        });
        this.connectionUrl = new url_1.URL(connectionString);
        this.defaultDbName =
            (this.connectionUrl.pathname[0] === '/'
                ? this.connectionUrl.pathname[0].slice(1)
                : this.connectionUrl.pathname[0]) || 'main';
        this.disposer = new object_lifecycle_1.Disposer(() => {
            return this.client.close().then(() => {
                logger_1.logger.info('MongoDB disconnected');
            });
        }, () => !this.client.isConnected());
        this[object_lifecycle_1.ASYNC_INIT] = this.client
            .connect()
            .then((client) => {
            return this.client.db().command({
                ping: 1,
            });
        })
            .then(() => {
            logger_1.logger.info('MongoDB connected');
        });
    }
    get isDisposed() {
        return this.disposer.isDisposed;
    }
    dispose() {
        return this.disposer.dispose();
    }
};
MongodbConnectionService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.Types.MongoDbConnectionString)),
    __metadata("design:paramtypes", [String])
], MongodbConnectionService);
exports.MongodbConnectionService = MongodbConnectionService;
function toShallowDocument(item) {
    const document = {};
    for (const prop in item) {
        if (!item.hasOwnProperty(prop)) {
            continue;
        }
        if (item[prop] instanceof decimal_js_1.default) {
            document[prop] = decimalToDecimal128(item[prop]);
        }
        else {
            document[prop] = item[prop];
        }
    }
    return document;
}
exports.toShallowDocument = toShallowDocument;
function decimalToDecimal128(decimal) {
    return mongodb_1.Decimal128.fromString(decimal.toString());
}
exports.decimalToDecimal128 = decimalToDecimal128;
function decimal128ToDecimal(decimal) {
    return new decimal_js_1.default(decimal.toString());
}
exports.decimal128ToDecimal = decimal128ToDecimal;
//# sourceMappingURL=mongodb-connection.service.js.map