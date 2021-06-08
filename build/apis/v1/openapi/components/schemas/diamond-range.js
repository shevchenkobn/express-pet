"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondRangeSchema = void 0;
const diamond_clarity_1 = require("./diamond-clarity");
const diamond_color_1 = require("./diamond-color");
const diamond_cut_1 = require("./diamond-cut");
const non_negative_decimal_1 = require("./non-negative-decimal");
exports.DiamondRangeSchema = {
    type: 'object',
    properties: {
        carat: {
            oneOf: [
                non_negative_decimal_1.NonNegativeDecimalSchema,
                {
                    type: 'object',
                    properties: {
                        min: non_negative_decimal_1.NonNegativeDecimalSchema,
                        max: non_negative_decimal_1.NonNegativeDecimalSchema,
                    },
                    minProperties: 1,
                },
            ],
        },
        cut: diamond_cut_1.DiamondCutSchema,
        color: diamond_color_1.DiamondColorSchema,
        clarity: diamond_clarity_1.DiamondClaritySchema,
    },
    minProperties: 1,
};
//# sourceMappingURL=diamond-range.js.map