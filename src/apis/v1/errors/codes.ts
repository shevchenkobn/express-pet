export enum ErrorCode {
  JsonBad = 'json.bad',

  OpenApiValidation = 'openApi.validation',

  Server = 'server',
  ServerOpenapiResponseValidation = 'server.openApi.response.validation',
  NotFound = 'notFound',

  AssessedDiamondNotFound = 'assessedDiamond.notFound',
}

export type ServerErrorCode =
  | ErrorCode.Server
  | ErrorCode.ServerOpenapiResponseValidation;
