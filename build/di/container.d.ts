import { Container } from 'inversify';
import { Di } from '../lib/di';
export declare const defaultScope: import("inversify/lib/interfaces/interfaces").interfaces.BindingScope;
declare class MainDi extends Di {
    protected createContainer(): Container;
}
export declare const di: MainDi;
export {};
