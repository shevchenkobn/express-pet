import { Handler } from 'express';
import { ErrorCode } from '../errors/codes';
import { LogicError } from '../errors/logic.error';

export const notFoundHandler: Handler = (req, res) => {
  res
    .status(404)
    .json(new LogicError(ErrorCode.NOT_FOUND, `Route ${req.url} is not found`));
};
