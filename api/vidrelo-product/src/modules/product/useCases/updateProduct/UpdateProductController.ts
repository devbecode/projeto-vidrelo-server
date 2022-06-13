import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProductUseCase } from './UpdateProductUseCase';

export class UpdateProductController {
  async updateById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, full_description, short_description, gallery, installation } =
      request.body;

    const updateProduct = container.resolve(UpdateProductUseCase);
    const product = await updateProduct.updateById({
      id,
      name,
      full_description,
      short_description,
      installation,
      gallery,
    });

    return response.json(product);
  }

  async inactive(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const inactive = container.resolve(UpdateProductUseCase);
    await inactive.inactive(id);
    return response.send();
  }
}
