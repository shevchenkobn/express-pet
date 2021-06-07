import { config as loadConfig } from 'dotenv';
import appRootPath from 'app-root-path';
import { DeepReadonly } from './types';

export interface Config {
  host: string;
  mongoDbUrl: string;
  logLevel: string;
}

export function isNotProduction(): boolean {
  return (
    !!process.env.DEBUG ||
    !process.env.NODE_ENV ||
    process.env.NODE_ENV !== 'production'
  );
}

export const projectEnvPrefix = 'EXPE_';

const envConfig = loadConfig({
  path: appRootPath.resolve(
    process.env[projectEnvPrefix + 'CONFIG'] || './config/.env'
  ),
  debug: isNotProduction(),
});
const loadError = envConfig.error as NodeJS.ErrnoException;
if (loadError) {
  if (loadError.code === 'ENOENT' || loadError.code === 'EACCES') {
    console.info(
      `Failed to load config from file "${loadError.path}": ${loadError.code}`
    );
  } else {
    console.warn('Unknown config file loading error', loadError);
  }
}

function getConfig(): Config {
  const key = projectEnvPrefix + 'MONGO_DB';
  const mongoDbUrl = process.env[key];
  if (!mongoDbUrl) {
    throw new Error(`Env "${key}": MongoDB url is missing`);
  }
  return {
    host: process.env[projectEnvPrefix + 'HOST'] || 'localhost:5000',
    mongoDbUrl,
    logLevel:
      process.env[projectEnvPrefix + 'LOG_LEVEL'] ||
      (isNotProduction() ? 'DEBUG' : 'WARN'),
  };
}

export const config: DeepReadonly<Config> = getConfig();
