"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validErrorCodes = exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["JsonBad"] = "json.bad";
    ErrorCode["OpenApiValidation"] = "openApi.validation";
    ErrorCode["Server"] = "server";
    ErrorCode["ServerOpenapiResponseValidation"] = "server.openApi.response.validation";
    ErrorCode["NotFound"] = "notFound";
    ErrorCode["AssessedDiamondNotFound"] = "assessedDiamond.notFound";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
exports.validErrorCodes = Object.values(ErrorCode);
//# sourceMappingURL=codes.js.map