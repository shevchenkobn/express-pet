import { ErrorCode } from './codes';
import { LogicError } from './logic.error';
export declare class EntityNotFoundError<I = string> extends LogicError {
    readonly id: I;
    constructor(id: I, code?: ErrorCode, message?: string, innerError?: any);
}
