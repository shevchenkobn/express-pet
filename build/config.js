"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.isDevelopment = exports.projectEnvPrefix = void 0;
const dotenv_1 = require("dotenv");
const app_root_path_1 = __importDefault(require("app-root-path"));
exports.projectEnvPrefix = 'EXPE_';
function isDevelopment() {
    return (!!process.env.DEBUG ||
        !process.env.NODE_ENV ||
        process.env.NODE_ENV !== 'production');
}
exports.isDevelopment = isDevelopment;
const envConfig = dotenv_1.config({
    path: app_root_path_1.default.resolve(process.env[exports.projectEnvPrefix + 'CONFIG'] || './config/.env'),
    debug: isDevelopment(),
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
    const key = exports.projectEnvPrefix + 'MONGO_DB';
    const mongoDbUrl = process.env[key];
    if (!mongoDbUrl) {
        throw new Error(`Env "${key}": MongoDB url is missing`);
    }
    return {
        host: process.env[exports.projectEnvPrefix + 'HOST'] || 'localhost:5000',
        mongoDbUrl,
    };
}
exports.config = getConfig();
//# sourceMappingURL=config.js.map