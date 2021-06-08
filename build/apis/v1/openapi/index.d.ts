import { Container } from 'inversify';
import { OpenAPIRequestValidatorArgs } from 'openapi-request-validator';
import { Express } from 'express';
import { ExpressOpenAPIArgs, Operation } from 'express-openapi';
import { OpenAPIV3 } from 'openapi-types';
export interface OpenApiPathItemHandler {
    parameters?: OpenAPIV3.ParameterObject[];
    summary?: string;
    description?: string;
    get?: Operation;
    put?: Operation;
    post?: Operation;
    delete?: Operation;
    options?: Operation;
    head?: Operation;
    patch?: Operation;
}
export declare function getOpenApiOptions(app: Express, apiDoc: OpenAPIV3.Document, di: Container): ExpressOpenAPIArgs;
export declare function getOpenApiResolversBasePath(): string;
export declare const errorTransformer: OpenAPIRequestValidatorArgs['errorTransformer'];
export declare enum OpenApiTags {
    Diamonds = "diamonds"
}
export declare const apiPrefix = "/api/v1";
export declare function getOpenApiDoc(originUrl?: string): OpenAPIV3.Document;
