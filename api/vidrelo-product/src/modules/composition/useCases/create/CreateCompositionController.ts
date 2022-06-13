import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateComposition } from './CreateComposition';

export class CreateCompositionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { productId, itensIds, categoryId } = request.body;

    const createUseCase = container.resolve(CreateComposition);
    const composition = await createUseCase.create({
      product_id: productId,
      itens_id: itensIds,
      category_id: categoryId,
    });

    return response.json(composition);
  }
}
