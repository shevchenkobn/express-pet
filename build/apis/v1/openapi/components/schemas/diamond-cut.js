"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondCutSchema = void 0;
const diamond_1 = require("../../../../../models/diamond");
exports.DiamondCutSchema = {
    type: 'string',
    description: 'Diamond cut',
    enum: Object.values(diamond_1.DiamondCut),
};
//# sourceMappingURL=diamond-cut.js.map