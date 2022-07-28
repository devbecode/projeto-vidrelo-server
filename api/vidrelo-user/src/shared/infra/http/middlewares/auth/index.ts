import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { USER_PROFILE } from '@modules/user/domain/User';
import { AppError } from '@shared/error/AppError';

enum PUBLIC_ROUTES {
  CREATE_USER = '/v1/user',
}

const checkToken = (
  request: Request,
  response: Response,
  next: NextFunction,
  // eslint-disable-next-line consistent-return
) => {
  const authToken = request.headers.authorization;
  const { profile, forgotPassword } = request.body;
  const secretKey = process.env.SECRET_KEY;
  if (forgotPassword) {
    return next();
  }
  if (
    profile === USER_PROFILE.CLIENT &&
    request.originalUrl === PUBLIC_ROUTES.CREATE_USER
  ) {
    return next();
  }

  if (!authToken) {
    throw new AppError(`Token can not be empty`, 403);
  }

  if (request.query)
    try {
      const [, token] = authToken.split(' ');

      verify(token, secretKey);
      return next();
    } catch (error) {
      throw new AppError(`Invalid token`, 403);
    }
};

export { checkToken };
