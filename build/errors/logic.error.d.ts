import { ErrorObject } from 'serialize-error';
import { AsInterface } from '../lib/types';
import { ErrorCode } from './codes';
export interface ILogicError {
    code: ErrorCode;
}
export declare class LogicError extends TypeError implements ILogicError {
    readonly code: ErrorCode;
    readonly innerError?: any;
    constructor(code: ErrorCode, message?: string, innerError?: any);
    asJsonObject(debug?: boolean): (AsInterface<this> & ErrorObject) | this;
}
