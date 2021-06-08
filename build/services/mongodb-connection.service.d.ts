/// <reference types="node" />
import Decimal from 'decimal.js';
import { Decimal128, MongoClient } from 'mongodb';
import { URL } from 'url';
import { AsyncInitializable, Disposable, ASYNC_INIT } from '../lib/object-lifecycle';
export interface SkipLimit {
    skip?: number;
    limit: number;
}
export declare class MongodbConnectionService implements Disposable, AsyncInitializable {
    readonly client: MongoClient;
    readonly connectionUrl: URL;
    readonly defaultDbName: string;
    readonly [ASYNC_INIT]: Promise<void>;
    get isDisposed(): boolean;
    private disposer;
    constructor(connectionString: string);
    dispose(): Promise<void>;
}
export declare type MongoDbDocument<T> = {
    [K in keyof T]: T[K] extends Decimal ? Decimal128 : T[K];
};
export declare function toShallowDocument<T extends Record<string, any> = Record<string, any>>(item: T): MongoDbDocument<T>;
export declare function decimalToDecimal128(decimal: Decimal): Decimal128;
export declare function decimal128ToDecimal(decimal: Decimal128): Decimal;
