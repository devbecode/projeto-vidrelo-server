import { hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUseCase } from './UpdateUseCase';

import { AuthenticateUseCase } from '../../../auth/useCase/authenticate/AuthenticateUseCase';

export class UpdateController {
  public async inactiveById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const updateUseCase = container.resolve(UpdateUseCase);
    await updateUseCase.inactve(id);

    return response.json({ result: 'User deleted' });
  }
  public async updatePasswordById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id, email, password } = request.body;
    const hashedPassword = hashSync(password, 12);

    const updateUseCase = container.resolve(UpdateUseCase);
    await updateUseCase.updatePasswordById(id, hashedPassword);

    const authUseCase = container.resolve(AuthenticateUseCase);
    const responseAuth = await authUseCase.authenticate({ email, password });

    return response.json({ responseAuth });
  }
}
