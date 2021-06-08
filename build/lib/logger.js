"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerShutdown = exports.logger = exports.loggerCategory = void 0;
const log4js_1 = require("log4js");
Object.defineProperty(exports, "loggerShutdown", { enumerable: true, get: function () { return log4js_1.shutdown; } });
const app_root_path_1 = __importDefault(require("app-root-path"));
const config_1 = require("./config");
exports.loggerCategory = 'default';
log4js_1.configure({
    appenders: {
        console: {
            type: 'console',
            layout: {
                type: 'colored',
            },
        },
        file: {
            type: 'file',
            filename: app_root_path_1.default.resolve('logs/all.log'),
            pattern: '.yyyy-MM-dd',
            daysToKeep: 7,
            backups: 7,
            keepFileExt: true,
            alwaysIncludePattern: false,
            compress: false,
            maxLogSize: 1024 ** 2 * 4,
            layout: {
                type: 'basic',
            },
        },
    },
    categories: {
        [exports.loggerCategory]: {
            appenders: ['console', 'file'],
            level: config_1.config.logLevel,
        },
    },
});
exports.logger = log4js_1.getLogger(exports.loggerCategory);
//# sourceMappingURL=logger.js.map