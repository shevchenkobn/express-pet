import { Request, Response } from 'express';
import { OpenAPIV3 } from 'openapi-types';
import { IOpenAPIResponseValidator } from 'openapi-response-validator';

export interface OpenApiRequest extends Request {
  apiDoc: OpenAPIV3.Document & Record<string, any>;
}

export interface OpenApiResponse extends Response, IOpenAPIResponseValidator {}
