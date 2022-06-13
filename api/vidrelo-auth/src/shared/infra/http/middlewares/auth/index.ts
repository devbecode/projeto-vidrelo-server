import { NextFunction, Request, Response } from 'express';

export const checkToken = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(403).json({ message: 'Token can not be empty' });
  }

  // TODO - Código de validação
  next();
};
