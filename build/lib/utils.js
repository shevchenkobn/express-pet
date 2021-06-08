"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeResponseBody = void 0;
const mime_1 = require("mime");
const logger_1 = require("./logger");
function deserializeResponseBody(res, body) {
    if (typeof body !== 'string') {
        return body;
    }
    const type = mime_1.extension(res.get('Content-Type').split(/;\s*/)[0]);
    switch (type) {
        case 'json':
            return JSON.parse(body);
        default:
            logger_1.logger.warn(`Unexpected body type: ${type}. Returning string`);
            return body;
    }
}
exports.deserializeResponseBody = deserializeResponseBody;
//# sourceMappingURL=utils.js.map