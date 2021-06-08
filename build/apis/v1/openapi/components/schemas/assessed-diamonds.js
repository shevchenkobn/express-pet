"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessedDiamondSchema = void 0;
const non_negative_decimal_1 = require("./non-negative-decimal");
const non_assessed_diamonds_1 = require("./non-assessed-diamonds");
const object_id_1 = require("./object-id");
exports.AssessedDiamondSchema = {
    type: 'object',
    required: [...non_assessed_diamonds_1.NonAssessedDiamondSchema.required, 'id', 'name', 'price'],
    properties: Object.assign(Object.assign({}, non_assessed_diamonds_1.NonAssessedDiamondSchema.properties), { id: object_id_1.ObjectIdSchema, price: non_negative_decimal_1.NonNegativeDecimalSchema }),
};
//# sourceMappingURL=assessed-diamonds.js.map