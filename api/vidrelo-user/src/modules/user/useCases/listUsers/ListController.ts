import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUseCase } from './ListUseCase';

export class ListController {
  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const params = request.query;

    const listUseCase = container.resolve(ListUseCase);
    const users = await listUseCase.listAll(params);

    return response.json(users);
  }

  public async fyndById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const user = await container.resolve(ListUseCase).findById(id);
    return response.json(user);
  }
}
