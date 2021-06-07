import { config as loadConfig } from 'dotenv';
import appRootPath from 'app-root-path';
import { DeepReadonly } from './lib/types';

export const projectEnvPrefix = 'EXPE_';

export interface Config {
  host: string;
  mongoDbUrl: string;
}

export function isDevelopment(): boolean {
  return (
    !!process.env.DEBUG ||
    !process.env.NODE_ENV ||
    process.env.NODE_ENV !== 'production'
  );
}

const envConfig = loadConfig({
  path: appRootPath.resolve(
    process.env[projectEnvPrefix + 'CONFIG'] || './config/.env'
  ),
  debug: isDevelopment(),
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
  };
}

export const config: DeepReadonly<Config> = getConfig();
