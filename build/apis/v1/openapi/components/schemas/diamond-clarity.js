"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondClaritySchema = void 0;
const diamond_1 = require("../../../../../models/diamond");
exports.DiamondClaritySchema = {
    type: 'string',
    description: 'Diamond clarity',
    enum: Object.values(diamond_1.DiamondClarity),
};
//# sourceMappingURL=diamond-clarity.js.map