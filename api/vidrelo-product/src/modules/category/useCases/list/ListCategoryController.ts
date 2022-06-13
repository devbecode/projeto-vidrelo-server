import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategories } from './ListCategories';

export class ListCategoriesController {
  public async listaAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const params = request.query;

    const categories = await container.resolve(ListCategories).listAll(params);
    return response.json(categories);
  }
}
