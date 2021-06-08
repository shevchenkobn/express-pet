import { ErrorCode } from './codes';
export interface ILogicError {
    code: ErrorCode;
}
export declare class LogicError extends TypeError implements ILogicError {
    readonly code: ErrorCode;
    readonly innerError?: any;
    constructor(code: ErrorCode, message?: string, innerError?: any);
}
