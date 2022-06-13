import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOrder } from './CreateOrder';

export class CreateOrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { number, budgets, userId } = request.body;
    const createUseCase = container.resolve(CreateOrder);
    const order = await createUseCase.create({ number, budgets, userId });

    return response.json(order);
  }
}
