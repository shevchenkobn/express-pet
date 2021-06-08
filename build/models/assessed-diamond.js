"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromLooseNonAssessedDiamond = exports.cloneAssessedDiamond = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
function cloneAssessedDiamond(diamond) {
    return Object.assign({}, diamond);
}
exports.cloneAssessedDiamond = cloneAssessedDiamond;
function fromLooseNonAssessedDiamond(obj) {
    const diamond = {
        carat: new decimal_js_1.default(obj.carat),
        cut: obj.cut.toLowerCase(),
        color: obj.color.toLowerCase(),
        clarity: obj.clarity.toLowerCase(),
    };
    if ('name' in obj) {
        diamond.name = obj.name;
    }
    return diamond;
}
exports.fromLooseNonAssessedDiamond = fromLooseNonAssessedDiamond;
//# sourceMappingURL=assessed-diamond.js.map