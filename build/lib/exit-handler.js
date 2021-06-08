"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableExitTimeout = exports.enableExitTimeout = exports.exitGracefully = exports.unbindOnExitHandler = exports.bindOnExitHandler = void 0;
const logger_1 = require("./logger");
const errorHandler = (err, p) => {
    if (p) {
        logger_1.logger.fatal('Unhandled promise rejection for ', p, err);
    }
    else {
        logger_1.logger.fatal('Unhandled exception!', err);
    }
    execHandlers()
        .catch((err) => {
        logger_1.logger.fatal('The process is not shut down gracefully! Error while error handling.', err);
    })
        .finally(() => {
        process.on('exit', () => {
            logger_1.logger.warn('WARNING! Non-one exit code!');
            process.kill(process.pid);
        });
        process.exit(1);
    });
};
process.on('uncaughtException', errorHandler);
process.on('unhandledRejection', errorHandler);
let onSignalHandler = null;
function bindOnExitHandler(handler, unshift = false) {
    if (unshift) {
        list.unshift(handler);
    }
    else {
        list.push(handler);
    }
    if (!onSignalHandler) {
        initListeners();
    }
}
exports.bindOnExitHandler = bindOnExitHandler;
function unbindOnExitHandler(handler) {
    for (let i = 0; i < list.length; i += 1) {
        if (list[i] === handler) {
            list.splice(i, 1);
            break;
        }
    }
    if (list.length === 0) {
        removeListeners();
    }
}
exports.unbindOnExitHandler = unbindOnExitHandler;
function exitGracefully(exitCode) {
    if (onSignalHandler) {
        onSignalHandler();
    }
    else {
        process.exit(exitCode);
    }
}
exports.exitGracefully = exitGracefully;
const exitTimeout = 3000;
function enableExitTimeout() {
    if (!timeoutEnabled) {
        logger_1.logger.info(`${exitTimeout} ms before exiting...`);
        setExitTimeout();
        timeoutEnabled = true;
    }
}
exports.enableExitTimeout = enableExitTimeout;
function disableExitTimeout() {
    if (timeoutEnabled) {
        logger_1.logger.info('The process can take a minute to exit. Please, stand by.');
        resetExitTimeout();
        timeoutEnabled = false;
    }
}
exports.disableExitTimeout = disableExitTimeout;
function initListeners() {
    onSignalHandler = (signal) => {
        if (signal) {
            logger_1.logger.info(`Received signal ${signal}`);
        }
        execHandlers()
            .catch((err) => {
            logger_1.logger.fatal(err);
            process.exit(1);
        })
            .then(() => {
            process.exit(0);
        });
    };
    process.on('SIGINT', onSignalHandler);
    process.on('SIGTERM', onSignalHandler);
    process.on('SIGQUIT', onSignalHandler);
    process.on('SIGHUP', onSignalHandler);
    process.on('SIGBREAK', onSignalHandler);
}
function removeListeners() {
    if (onSignalHandler) {
        process.off('SIGINT', onSignalHandler);
        process.off('SIGTERM', onSignalHandler);
        process.off('SIGQUIT', onSignalHandler);
        process.off('SIGHUP', onSignalHandler);
        process.off('SIGBREAK', onSignalHandler);
    }
    onSignalHandler = null;
}
let handled = false;
let timeoutEnabled = true;
let timeout = null;
const list = [];
async function execHandlers() {
    if (handled) {
        logger_1.logger.info('Process exit handlers are being executed. Waiting...');
        return;
    }
    handled = true;
    if (list.length > 0) {
        logger_1.logger.info('The process is running exit handlers...');
        if (timeoutEnabled) {
            setExitTimeout();
        }
        for (const handler of list) {
            await handler();
        }
        resetExitTimeout();
    }
}
function setExitTimeout() {
    timeout = setTimeout(() => {
        logger_1.logger.fatal('The process exited due to too long wait for exit handlers!');
        process.exit(1);
    }, exitTimeout);
}
function resetExitTimeout() {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
}
//# sourceMappingURL=exit-handler.js.map