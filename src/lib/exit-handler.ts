import { logger } from './logger';
import { Nullable } from './types';

export type ExitHandler = () => void | PromiseLike<void>;

const errorHandler: (err: any, p?: Promise<any>) => void = (err, p) => {
  if (p) {
    logger.fatal('Unhandled promise rejection for ', p, err);
  } else {
    logger.fatal('Unhandled exception!', err);
  }
  execHandlers()
    .catch((err) => {
      logger.fatal(
        'The process is not shut down gracefully! Error while error handling.',
        err
      );
    })
    .finally(() => {
      process.on('exit', () => {
        logger.warn('WARNING! Non-one exit code!');
        process.kill(process.pid);
      });
      process.exit(1);
    });
};
process.on('uncaughtException', errorHandler);
process.on('unhandledRejection', errorHandler);

type SignalListenerWithCode = (signal?: NodeJS.Signals) => void;
let onSignalHandler: Nullable<SignalListenerWithCode> = null;

export function bindOnExitHandler(handler: ExitHandler, unshift = false) {
  if (unshift) {
    list.unshift(handler);
  } else {
    list.push(handler);
  }
  if (!onSignalHandler) {
    initListeners();
  }
}

export function unbindOnExitHandler(handler: ExitHandler) {
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

export function exitGracefully(exitCode: number) {
  if (onSignalHandler) {
    onSignalHandler();
  } else {
    process.exit(exitCode);
  }
}

const exitTimeout = 3000;

export function enableExitTimeout() {
  if (!timeoutEnabled) {
    logger.info(`${exitTimeout} ms before exiting...`);
    setExitTimeout();
    timeoutEnabled = true;
  }
}

export function disableExitTimeout() {
  if (timeoutEnabled) {
    logger.info('The process can take a minute to exit. Please, stand by.');
    resetExitTimeout();
    timeoutEnabled = false;
  }
}

function initListeners() {
  onSignalHandler = (signal) => {
    if (signal) {
      logger.info(`Received signal ${signal}`);
    }
    execHandlers()
      .catch((err) => {
        logger.fatal(err);
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
let timeout: Nullable<NodeJS.Timeout> = null;
const list: ExitHandler[] = [];

async function execHandlers() {
  if (handled) {
    logger.info('Process exit handlers are being executed. Waiting...');
    return;
  }
  handled = true;
  if (list.length > 0) {
    logger.info('The process is running exit handlers...');
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
    logger.fatal('The process exited due to too long wait for exit handlers!');
    process.exit(1);
  }, exitTimeout);
}

function resetExitTimeout() {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
}
