"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondColorSchema = void 0;
const diamond_1 = require("../../../../../models/diamond");
exports.DiamondColorSchema = {
    type: 'string',
    description: 'Diamond color',
    enum: Object.values(diamond_1.DiamondColor),
};
//# sourceMappingURL=diamond-color.js.map