import { Request, Response } from 'express';
import { hashSync } from 'bcrypt';
import { container } from 'tsyringe';

import { UpdateUseCase } from './UpdateUseCase';

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
    const { id, password } = request.body;
    const updateUseCase = container.resolve(UpdateUseCase);
    await updateUseCase.updatePasswordById(id, password);

    return response.json({ result: 'User updated' });
  }
}
