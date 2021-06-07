import { DeepReadonly } from '../../../lib/types';
import { ServerErrorCode } from './codes';
import { LogicError } from './logic.error';

export class ServerError extends LogicError {
  readonly innerError?: DeepReadonly<any>;

  constructor(
    code: ServerErrorCode,
    innerError?: DeepReadonly<any>,
    message?: string
  ) {
    super(code);
    this.innerError = innerError;
    if (message) {
      Object.defineProperty(this, 'message', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: message,
      });
    }
  }
}
