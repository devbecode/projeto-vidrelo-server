import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ChangePasswordUseCase } from './ChangePasswordUseCase';

export class ChangePasswordController {
  async changePassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id, password, user_email } = request.body;

    await container
      .resolve(ChangePasswordUseCase)
      .createPassword({ user_id, user_email, newPassword: password });

    return response.json({ result: 'Password changed!' });
  }
}
