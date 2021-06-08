"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureInjectable = exports.Types = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
exports.Types = {
    MongoDbConnectionString: Symbol.for('MongoDbConnectionString'),
    MongoDbConnection: Symbol.for('MongoDbConnection'),
    DiamondCalculator: Symbol.for('DiamondCalculator'),
    DiamondRepository: Symbol.for('DiamondRepository'),
};
const injectables = new Set();
function ensureInjectable(type) {
    if (injectables.has(type)) {
        return;
    }
    inversify_1.decorate(inversify_1.injectable(), type);
    injectables.add(type);
}
exports.ensureInjectable = ensureInjectable;
//# sourceMappingURL=types.js.map