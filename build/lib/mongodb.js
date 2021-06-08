"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectIdToDecimal = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
function objectIdToDecimal(id) {
    return new decimal_js_1.default('0x' + id.toHexString());
}
exports.objectIdToDecimal = objectIdToDecimal;
//# sourceMappingURL=mongodb.js.map