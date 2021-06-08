"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../import-side-effects");
const http_1 = require("http");
const app_1 = require("../apis/v1/app");
const container_1 = require("../di/container");
const config_1 = require("../lib/config");
const exit_handler_1 = require("../lib/exit-handler");
const logger_1 = require("../lib/logger");
async function main() {
    logger_1.logger.info((config_1.isNotProduction() ? 'Not production' : 'Production') + ' environment');
    const { app } = await app_1.createApp(`http://${config_1.config.host}:${config_1.config.port}`);
    if (container_1.di.isContainerCreated) {
        exit_handler_1.bindOnExitHandler(() => {
            return container_1.di.disposeContainer();
        });
    }
    const server = http_1.createServer(app);
    server.listen(config_1.config.port, config_1.config.host, () => {
        logger_1.logger.info(`Listening at ${config_1.config.host}:${config_1.config.port}`);
    });
}
main().catch((err) => {
    logger_1.logger.fatal('Process crashed with exception!', err);
    exit_handler_1.exitGracefully(1);
});
//# sourceMappingURL=www.js.map