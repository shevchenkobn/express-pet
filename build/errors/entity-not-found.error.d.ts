import { NotFoundErrorCode } from './codes';
import { LogicError } from './logic.error';
export declare class EntityNotFoundError<I = string> extends LogicError {
    readonly entityId: I;
    constructor(entityId: I, code?: NotFoundErrorCode, message?: string, innerError?: any);
}
