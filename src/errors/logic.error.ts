import { ErrorObject, serializeError } from 'serialize-error';
import { AsInterface } from '../lib/types';
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

  asJsonObject(debug = false): (AsInterface<this> & ErrorObject) | this {
    if (!debug) {
      return this;
    }
    const data = serializeError(this) as AsInterface<this> & ErrorObject;
    data.name = this.constructor.name;
    return data;
  }
}
