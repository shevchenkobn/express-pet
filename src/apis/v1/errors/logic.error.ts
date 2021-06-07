import { ErrorCode } from './codes';

export interface ILogicError {
  code: ErrorCode;
}

export class LogicError extends TypeError implements ILogicError {
  readonly code: ErrorCode;
  readonly innerError?: any;

  constructor(code: ErrorCode, message?: string, innerError?: any) {
    if (!message) {
      super(code);
    } else {
      super(message);
    }
    this.code = code;
    if (innerError !== undefined) {
      this.innerError = innerError;
    }
  }
}
