export declare enum ErrorCode {
    JsonBad = "json.bad",
    OpenApiValidation = "openApi.validation",
    Server = "server",
    ServerOpenapiResponseValidation = "server.openApi.response.validation",
    NotFound = "notFound",
    AssessedDiamondNotFound = "assessedDiamond.notFound"
}
export declare const validErrorCodes: ErrorCode[];
export declare type ServerErrorCode = ErrorCode.Server | ErrorCode.ServerOpenapiResponseValidation;
export declare const serverErrorCodes: ErrorCode[];
export declare type NotFoundErrorCode = ErrorCode.NotFound | ErrorCode.AssessedDiamondNotFound;
export declare const notFoundErrorCodes: ErrorCode[];
