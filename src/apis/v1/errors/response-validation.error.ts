import { OpenAPIResponseValidatorValidationError } from 'openapi-response-validator';
import { DeepReadonly } from '../../../lib/types';
import { ErrorCode } from './codes';
import { ServerError } from './server.error';

export class ResponseValidationError extends ServerError {
  readonly innerError!: DeepReadonly<
    Partial<OpenAPIResponseValidatorValidationError>
  >;

  constructor(
    validationError: DeepReadonly<
      Partial<OpenAPIResponseValidatorValidationError>
    >,
    message?: string
  ) {
    super(
      ErrorCode.ServerOpenapiResponseValidation,
      validationError,
      message
    );
  }
}
