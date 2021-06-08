"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.projectEnvPrefix = exports.isNotProduction = void 0;
const dotenv_1 = require("dotenv");
const app_root_path_1 = __importDefault(require("app-root-path"));
function isNotProduction() {
    return (!!process.env.DEBUG ||
        !process.env.NODE_ENV ||
        process.env.NODE_ENV !== 'production');
}
exports.isNotProduction = isNotProduction;
exports.projectEnvPrefix = 'EXPE_';
const envConfig = dotenv_1.config({
    path: app_root_path_1.default.resolve(process.env[exports.projectEnvPrefix + 'CONFIG'] || './config/.env'),
    debug: isNotProduction(),
});
const loadError = envConfig.error;
if (loadError) {
    if (loadError.code === 'ENOENT' || loadError.code === 'EACCES') {
        console.info(`Failed to load config from file "${loadError.path}": ${loadError.code}`);
    }
    else {
        console.warn('Unknown config file loading error', loadError);
    }
}
function getConfig() {
    var _a, _b;
    let key = exports.projectEnvPrefix + 'MONGO_DB';
    const mongoDbUrl = process.env[key];
    if (!mongoDbUrl) {
        throw new Error(`Env "${key}": MongoDB url is missing`);
    }
    key = exports.projectEnvPrefix + 'PORT';
    const port = Number.parseInt((_a = process.env[exports.projectEnvPrefix + 'PORT']) !== null && _a !== void 0 ? _a : '5000');
    if (Number.isNaN(port)) {
        throw new Error(`Env "${key}": port "${(_b = process.env[key]) !== null && _b !== void 0 ? _b : ''}" is not a number`);
    }
    return {
        host: process.env[exports.projectEnvPrefix + 'HOST'] || 'localhost',
        port,
        mongoDbUrl,
        logLevel: process.env[exports.projectEnvPrefix + 'LOG_LEVEL'] ||
            (isNotProduction() ? 'DEBUG' : 'WARN'),
    };
}
exports.config = getConfig();
//# sourceMappingURL=config.js.map