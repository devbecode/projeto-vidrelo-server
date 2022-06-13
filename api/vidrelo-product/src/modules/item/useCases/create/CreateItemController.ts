import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateItem } from './CreateItem';

export class CreateItemController {
  async create(request: Request, response: Response): Promise<Response> {
    const { gallery, categoryId, measure, price, name } = request.body;

    const createUseCase = container.resolve(CreateItem);
    const item = await createUseCase.create({
      measure,
      value: price,
      name,
      categoryId,
      gallery,
    });

    return response.json(item);
  }
}
