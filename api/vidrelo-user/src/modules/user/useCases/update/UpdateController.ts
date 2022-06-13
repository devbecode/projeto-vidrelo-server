import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUseCase } from './UpdateUseCase';

export class UpdateController {
  public async updateById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      password,
      telephone,
      profile,
      cep,
      state,
      district,
      street,
      number,
      complement,
      city,
    } = request.body;

    const updateUseCase = container.resolve(UpdateUseCase);
    const user = await updateUseCase.updateById({
      name,
      password,
      telephone,
      profile,
      id,
      cep,
      state,
      district,
      street,
      number,
      complement,
      city,
    });

    return response.json(user);
  }

  public async inactiveById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const updateUseCase = container.resolve(UpdateUseCase);
    await updateUseCase.inactve(id);

    return response.send();
  }
}
