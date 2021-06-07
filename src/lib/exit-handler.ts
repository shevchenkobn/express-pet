import { logger } from './logger';
import { Nullable } from './types';

export type ExitHandler = () => void | PromiseLike<void>;

const list: ExitHandler[] = [];

const exitTimeout = 3000;

let handled = false;
type SignalListenerWithCode = (
  signal: NodeJS.Signals,
  exitCode?: number
) => void;

let onSignalHandler: Nullable<SignalListenerWithCode> = null;

const errorHandler: (err: any, p?: Promise<any>) => void = (err, p) => {
  if (p) {
    logger.error('Unhandled promise rejection for ');
    logger.error(p);
  } else {
    logger.error('Unhandled exception!');
  }
  logger.error(err);
  execHandlers()
    .catch((err) => {
      logger.error(
        'The process is not shut down gracefully! Error while error handling.'
      );
      logger.error(err);
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
    onSignalHandler('SIGQUIT', exitCode);
  } else {
    process.exit(exitCode);
  }
}

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
  onSignalHandler = (signal, exitCode = 0) => {
    execHandlers()
      .catch((err) => {
        logger.error(err);
        process.exit(1);
      })
      .then(() => {
        process.exit(exitCode);
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

let timeoutEnabled = true;
let timeout: Nullable<NodeJS.Timeout> = null;
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
    logger.error('The process exited due to too long wait for exit handlers!');
    process.exit(1);
  }, exitTimeout);
}

function resetExitTimeout() {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
}
