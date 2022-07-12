import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUseCase } from './CreateUseCase';

export class CreateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUseCase = container.resolve(CreateUseCase);

    const user = await createUseCase.create({
      email,
      password,
    });

    return response.json(user);
  }
}
