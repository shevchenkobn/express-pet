import { configure, getLogger, shutdown as loggerShutdown } from 'log4js';
import appRootPath from 'app-root-path';
import { config } from './config';

export const loggerCategory = 'default';

configure({
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'colored',
      },
    },
    file: {
      type: 'file',
      filename: appRootPath.resolve('logs/all.log'),
      pattern: 'yyyy-MM-dd',
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
    [loggerCategory]: {
      appenders: ['console', 'file'],
      level: config.logLevel,
    },
  },
});

export const logger = getLogger(loggerCategory);
export { loggerShutdown };
