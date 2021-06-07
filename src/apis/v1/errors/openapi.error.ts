import { OpenAPIRequestValidatorError } from 'openapi-request-validator';
import { DeepReadonly } from '../../../lib/types';
import * as Ajv from 'ajv';
import { ErrorCode } from './codes';
import { ILogicError } from './logic.error';

export interface IOpenApiFinalError {
  status: number;
  errors?: any[];
}

export function isOpenApiFinalError(err: any): err is IOpenApiFinalError {
  return (
    typeof err === 'object' &&
    err !== null &&
    typeof err.status === 'number' &&
    Array.isArray(err.errors)
  );
}

export interface IOpenApiFinalLogicError
  extends ILogicError,
    IOpenApiFinalError {}

export function coerceLogicError(
  err: IOpenApiFinalError
): IOpenApiFinalLogicError {
  const error = err as IOpenApiFinalLogicError;
  error.code = ErrorCode.OpenApiValidation;
  return error;
}

export class OpenapiError extends Error {
  readonly openApiError: DeepReadonly<OpenAPIRequestValidatorError>;
  readonly jsonSchemaError: DeepReadonly<Ajv.ErrorObject>;

  constructor(
    openApiError: DeepReadonly<OpenAPIRequestValidatorError>,
    jsonSchemaError: DeepReadonly<Ajv.ErrorObject>,
    message?: string
  ) {
    super(message);
    this.openApiError = openApiError;
    this.jsonSchemaError = jsonSchemaError;
  }
}
