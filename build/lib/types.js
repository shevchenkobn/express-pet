"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cast = exports.as = exports.t = exports.asPartial = exports.asReadonly = void 0;
exports.asReadonly = Symbol('asReadonly');
exports.asPartial = Symbol('asPartial');
function t(...args) {
    return args;
}
exports.t = t;
function as(value) {
    return true;
}
exports.as = as;
function cast(value) { }
exports.cast = cast;
//# sourceMappingURL=types.js.map