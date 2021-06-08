"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonAssessedDiamondSchema = void 0;
const diamond_clarity_1 = require("./diamond-clarity");
const diamond_color_1 = require("./diamond-color");
const diamond_cut_1 = require("./diamond-cut");
const non_negative_decimal_1 = require("./non-negative-decimal");
exports.NonAssessedDiamondSchema = {
    type: 'object',
    required: ['carat', 'cut', 'color', 'clarity'],
    properties: {
        name: {
            type: 'string',
            minLength: 1,
        },
        carat: non_negative_decimal_1.NonNegativeDecimalSchema,
        cut: diamond_cut_1.DiamondCutSchema,
        color: diamond_color_1.DiamondColorSchema,
        clarity: diamond_clarity_1.DiamondClaritySchema,
    },
};
//# sourceMappingURL=non-assessed-diamonds.js.map