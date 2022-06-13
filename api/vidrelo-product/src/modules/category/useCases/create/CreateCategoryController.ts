import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategory } from './CreateCategory';

export class CreateCategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createUseCase = container.resolve(CreateCategory);
    const category = await createUseCase.create(name);

    return response.json(category);
  }
}
