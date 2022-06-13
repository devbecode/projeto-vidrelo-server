import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUseCase } from './AuthenticateUseCase';

export class AuthenticateController {
  async authenticate(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticated = await container
      .resolve(AuthenticateUseCase)
      .authenticate({
        username,
        password,
      });

    return response.json(authenticated);
  }
}
