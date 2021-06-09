"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const codes_1 = require("../../../errors/codes");
const logic_error_1 = require("../../../errors/logic.error");
const notFoundHandler = (req, res) => {
    res
        .status(404)
        .json(new logic_error_1.LogicError(codes_1.ErrorCode.NotFound, `Route ${req.url} is not found`));
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=not-found.middleware.js.map