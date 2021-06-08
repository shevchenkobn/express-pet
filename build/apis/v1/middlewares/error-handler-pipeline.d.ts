import { ErrorRequestHandler } from 'express';
import { ErrorCode } from '../errors/codes';
export declare const errorCodes404: ErrorCode[];
export declare const errorCodes500: ErrorCode[];
export declare const errorHandlingPipeline: ErrorRequestHandler[];
