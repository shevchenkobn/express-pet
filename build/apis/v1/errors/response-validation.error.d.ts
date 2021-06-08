import { OpenAPIResponseValidatorValidationError } from 'openapi-response-validator';
import { DeepReadonly } from '../../../lib/types';
import { ServerError } from './server.error';
export declare class ResponseValidationError extends ServerError {
    readonly innerError: DeepReadonly<Partial<OpenAPIResponseValidatorValidationError>>;
    constructor(validationError: DeepReadonly<Partial<OpenAPIResponseValidatorValidationError>>, message?: string);
}
