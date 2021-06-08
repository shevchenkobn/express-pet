import { Container, interfaces } from 'inversify';
import { Nullable } from './types';
import ServiceIdentifier = interfaces.ServiceIdentifier;
export declare abstract class Di {
    protected container: Nullable<Container>;
    protected disposeCallbacks: ServiceIdentifier<any>[];
    protected initPromise: Nullable<Promise<void>>;
    protected asyncInitServices: ServiceIdentifier<any>[];
    get isContainerCreated(): boolean;
    getContainer(): Container;
    disposeContainer(): Promise<void>;
    getContainerInitPromise(): Promise<void>;
    protected getBaseInitPromise(): Promise<void>;
    protected abstract createContainer(): Container;
}
