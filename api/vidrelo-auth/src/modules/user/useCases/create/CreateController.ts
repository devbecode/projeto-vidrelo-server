import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUseCase } from './CreateUseCase';

export class CreateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password } = request.body;

    const createUseCase = container.resolve(CreateUseCase);

    const user = await createUseCase.create({
      name,
      password,
    });

    return response.json(user);
  }
}
