import { Container } from 'inversify';
import { Di } from '../../../lib/di';
declare class ApiV1Di extends Di {
    protected createContainer(): Container;
    protected getBaseInitPromise(): Promise<void>;
}
export declare const apiV1Di: ApiV1Di;
export {};
