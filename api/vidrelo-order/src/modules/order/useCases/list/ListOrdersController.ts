import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListOrders } from './ListOrders';

export class ListOrdersController {
  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { userId, ...params } = request.query;

    const listOrders = container.resolve(ListOrders);
    const orders = await listOrders.listAll({ ...params }, userId as string);

    return response.json(orders);
  }
}
