import { Request, Response } from 'express';
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
}
