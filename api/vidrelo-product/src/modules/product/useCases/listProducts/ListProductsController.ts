import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Product } from '@modules/product/domain/Product';
import { ListProductsUseCase } from '@modules/product/useCases/listProducts/ListProductsUseCase';

export class ListProductsController {
  async listAll(request: Request, response: Response): Promise<Response> {
    const params = request.query;

    const listProductsUseCase = container.resolve(ListProductsUseCase);
    const products = await listProductsUseCase.listAll({ ...params });

    return response.json(products);
  }

  async listAllPublic(request: Request, response: Response): Promise<Response> {
    const params = request.query;

    const listPublicProducts = container.resolve(ListProductsUseCase);
    const products = await listPublicProducts.listAllPublic({ ...params });

    return response.json(products);
  }

  async findDetailsById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const listProductsUseCase = container.resolve(ListProductsUseCase);
    const product: Product = await listProductsUseCase.findDetailsById(id);

    return response.json(product);
  }
}
