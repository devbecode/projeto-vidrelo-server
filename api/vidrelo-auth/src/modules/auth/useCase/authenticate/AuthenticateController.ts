import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUseCase } from './AuthenticateUseCase';

export class AuthenticateController {
  async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticated = await container
      .resolve(AuthenticateUseCase)
      .authenticate({
        email,
        password,
      });

    return response.json(authenticated);
  }
}
