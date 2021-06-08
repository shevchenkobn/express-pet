"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromLoosePartialDiamondRange = exports.DiamondClarity = exports.DiamondColor = exports.DiamondCut = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
var DiamondCut;
(function (DiamondCut) {
    DiamondCut["Cushion"] = "cushion";
    DiamondCut["Radiant"] = "radiant";
    DiamondCut["Princess"] = "princess";
    DiamondCut["Asscher"] = "asscher";
    DiamondCut["Round"] = "round";
    DiamondCut["Heart"] = "heart";
    DiamondCut["Triliant"] = "triliant";
    DiamondCut["Oval"] = "oval";
    DiamondCut["Pear"] = "pear";
    DiamondCut["Emerald"] = "emerald";
    DiamondCut["Marquise"] = "marquise";
    DiamondCut["Baguette"] = "baguette";
})(DiamondCut = exports.DiamondCut || (exports.DiamondCut = {}));
var DiamondColor;
(function (DiamondColor) {
    DiamondColor["D"] = "d";
    DiamondColor["E"] = "e";
    DiamondColor["F"] = "f";
    DiamondColor["G"] = "g";
    DiamondColor["H"] = "h";
    DiamondColor["I"] = "i";
    DiamondColor["J"] = "j";
    DiamondColor["K"] = "k";
    DiamondColor["L"] = "l";
    DiamondColor["M"] = "m";
    DiamondColor["N"] = "n";
    DiamondColor["O"] = "o";
    DiamondColor["P"] = "p";
    DiamondColor["Q"] = "q";
    DiamondColor["R"] = "r";
    DiamondColor["S"] = "s";
    DiamondColor["T"] = "t";
    DiamondColor["U"] = "u";
    DiamondColor["V"] = "v";
    DiamondColor["W"] = "w";
    DiamondColor["X"] = "x";
    DiamondColor["Y"] = "y";
    DiamondColor["Z"] = "z";
})(DiamondColor = exports.DiamondColor || (exports.DiamondColor = {}));
var DiamondClarity;
(function (DiamondClarity) {
    DiamondClarity["FL"] = "fl";
    DiamondClarity["IF"] = "if";
    DiamondClarity["VVS1"] = "vvs1";
    DiamondClarity["VVS2"] = "vvs2";
    DiamondClarity["VS1"] = "vs1";
    DiamondClarity["VS2"] = "vs2";
    DiamondClarity["SI1"] = "si1";
    DiamondClarity["SI2"] = "si2";
    DiamondClarity["SI3"] = "si3";
    DiamondClarity["I1"] = "i1";
    DiamondClarity["I2"] = "i2";
    DiamondClarity["I3"] = "I3";
})(DiamondClarity = exports.DiamondClarity || (exports.DiamondClarity = {}));
function fromLoosePartialDiamondRange(obj) {
    const range = {};
    if (obj.carat) {
        if (typeof obj.carat === 'string') {
            range.carat = new decimal_js_1.default(obj.carat);
        }
        else {
            const carat = {};
            if (obj.min) {
                carat.min = new decimal_js_1.default(obj.carat.min);
            }
            if (obj.max) {
                carat.max = new decimal_js_1.default(obj.carat.max);
            }
            range.carat = carat;
        }
    }
    if (obj.cut) {
        range.cut = obj.cut.toLowerCase();
    }
    if (obj.color) {
        range.color = obj.color.toLowerCase();
    }
    if (obj.clarity) {
        range.clarity = obj.clarity.toLowerCase();
    }
    return range;
}
exports.fromLoosePartialDiamondRange = fromLoosePartialDiamondRange;
//# sourceMappingURL=diamond.js.map