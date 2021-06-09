import { DeepReadonly } from '../lib/types';
import { ServerErrorCode } from './codes';
import { LogicError } from './logic.error';

export class ServerError extends LogicError {
  readonly innerError?: DeepReadonly<any>;

  constructor(
    code: ServerErrorCode,
    innerError?: DeepReadonly<any>,
    message?: string
  ) {
    super(code, message);
    this.innerError = innerError;
  }
}
