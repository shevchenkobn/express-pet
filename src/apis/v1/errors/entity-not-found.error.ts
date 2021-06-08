import { ErrorCode } from './codes';
import { LogicError } from './logic.error';

export class EntityNotFoundError<I = string> extends LogicError {
  constructor(
    public readonly id: I,
    code: ErrorCode = ErrorCode.NotFound,
    message?: string,
    innerError?: any
  ) {
    super(code, message, innerError);
  }
}
