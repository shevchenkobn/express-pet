import { DeepReadonly } from './lib/types';
export declare const projectEnvPrefix = "EXPE_";
export interface Config {
    host: string;
    mongoDbUrl: string;
}
export declare function isDevelopment(): boolean;
export declare const config: DeepReadonly<Config>;
