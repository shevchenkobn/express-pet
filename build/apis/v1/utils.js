"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParamNameFromScriptName = exports.fromQueryParam = void 0;
const path = __importStar(require("path"));
const querystring_1 = require("querystring");
function fromQueryParam(param) {
    return JSON.parse(querystring_1.unescape(param));
}
exports.fromQueryParam = fromQueryParam;
function getParamNameFromScriptName(fileName) {
    const name = path.basename(path.resolve(fileName), path.extname(fileName));
    return pathSegmentToParamName(name);
}
exports.getParamNameFromScriptName = getParamNameFromScriptName;
function pathSegmentToParamName(segment, checked = false) {
    if (!checked && !isParamPathSegment(segment)) {
        throw new TypeError(`"${segment}" must be in curve parenthesis {} to be a valid parameter name`);
    }
    return segment.slice(1, -1);
}
function isParamPathSegment(segment) {
    return segment[0] === '{' || segment[segment.length - 1] === '}';
}
//# sourceMappingURL=utils.js.map