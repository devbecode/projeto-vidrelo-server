import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './CreateProductUseCase';

export class CreateProductController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      full_description,
      short_description,
      gallery,
      cover,
      is_public,
      installation,
    } = request.body;

    const createUseCase = container.resolve(CreateProductUseCase);
    const product = await createUseCase.create({
      name,
      full_description,
      short_description,
      cover,
      is_public,
      installation,
      gallery,
    });

    return response.json(product);
  }
}
