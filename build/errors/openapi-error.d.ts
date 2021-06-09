import { OpenAPIRequestValidatorError } from 'openapi-request-validator';
import { DeepReadonly } from '../lib/types';
import * as Ajv from 'ajv';
import { ILogicError } from './logic.error';
export interface IOpenApiFinalError {
    status: number;
    errors?: any[];
}
export declare function isOpenApiFinalError(err: any): err is IOpenApiFinalError;
export interface IOpenApiFinalLogicError extends ILogicError, IOpenApiFinalError {
}
export declare function coerceLogicError(err: IOpenApiFinalError): IOpenApiFinalLogicError;
export declare class OpenApiError extends Error {
    readonly openApiError: DeepReadonly<OpenAPIRequestValidatorError>;
    readonly jsonSchemaError: DeepReadonly<Ajv.ErrorObject>;
    constructor(openApiError: DeepReadonly<OpenAPIRequestValidatorError>, jsonSchemaError: DeepReadonly<Ajv.ErrorObject>, message?: string);
}
