import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { VerifyUseCase } from './VerifyUseCase';

export class VerifyController {
  public async verifyCredentials(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, emailEncrypted } = request.body;

    const verifyUseCase = container.resolve(VerifyUseCase);

    const credentials = verifyUseCase.verify({
      email,
      emailEncrypted,
    });

    return response.json(credentials);
  }
}
