import { DeepReadonly } from './types';
export interface Config {
    host: string;
    port: number;
    mongoDbUrl: string;
    logLevel: string;
}
export declare function isNotProduction(): boolean;
export declare const projectEnvPrefix = "EXPE_";
export declare const config: DeepReadonly<Config>;
