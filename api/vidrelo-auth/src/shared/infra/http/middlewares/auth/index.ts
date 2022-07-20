import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const checkToken = (
  request: Request,
  response: Response,
  next: NextFunction,
  // eslint-disable-next-line consistent-return
) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    response.status(403).json({ message: 'Token can not be empty' });
  }

  const secretKey = process.env.SECRET_KEY;
  if (request.query)
    try {
      const [, token] = authToken.split(' ');

      verify(token, secretKey);
      return next();
    } catch (error) {
      response.status(403).json({ message: 'Invalid token' });
    }
  next();
};
