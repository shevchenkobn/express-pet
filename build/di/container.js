"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.di = exports.defaultScope = void 0;
const inversify_1 = require("inversify");
const config_1 = require("../lib/config");
const di_1 = require("../lib/di");
const diamonds_repository_1 = require("../repositories/diamonds.repository");
const diamond_calculator_service_1 = require("../services/diamond-calculator.service");
const mongodb_connection_service_1 = require("../services/mongodb-connection.service");
const types_1 = require("./types");
exports.defaultScope = inversify_1.BindingScopeEnum.Singleton;
class MainDi extends di_1.Di {
    createContainer() {
        const container = new inversify_1.Container({
            defaultScope: exports.defaultScope,
            autoBindInjectable: true,
        });
        container
            .bind(types_1.Types.MongoDbConnectionString)
            .toConstantValue(config_1.config.mongoDbUrl);
        container
            .bind(types_1.Types.MongoDbConnection)
            .to(mongodb_connection_service_1.MongodbConnectionService);
        this.asyncInitServices.push(types_1.Types.MongoDbConnection);
        this.disposeCallbacks.push(types_1.Types.MongoDbConnection);
        container
            .bind(types_1.Types.DiamondRepository)
            .to(diamonds_repository_1.DiamondsRepository);
        container
            .bind(types_1.Types.DiamondCalculator)
            .to(diamond_calculator_service_1.DiamondCalculatorService);
        return container;
    }
}
exports.di = new MainDi();
//# sourceMappingURL=container.js.map