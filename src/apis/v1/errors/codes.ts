export enum ErrorCode {
  JsonBad = 'json.bad',

  OpenApiValidation = 'openApi.validation',

  Server = 'server',
  ServerOpenapiResponseValidation = 'server.openApi.response.validation',
  NotFound = 'notFound',

  AssessedDiamondNotFound = 'assessedDiamond.notFound',
}

export const validErrorCodes = Object.values(ErrorCode);

export type ServerErrorCode =
  | ErrorCode.Server
  | ErrorCode.ServerOpenapiResponseValidation;
