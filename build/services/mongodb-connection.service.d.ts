/// <reference types="node" />
import { MongoClient } from 'mongodb';
import { URL } from 'url';
import { AsyncInitializable, Disposable, ASYNC_INIT } from '../lib/object-lifecycle';
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
export declare function toShallowDocument(item: Record<string, any>): Record<string, any>;
