import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUseCase } from './CreateUseCase';

export class CreateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      telephone,
      email,
      password,
      profile,
      cep,
      state,
      district,
      street,
      number,
      complement,
      city,
    } = request.body;

    const createUseCase = container.resolve(CreateUseCase);
    const user = await createUseCase.create({
      name,
      telephone,
      email,
      password,
      profile,
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
}
