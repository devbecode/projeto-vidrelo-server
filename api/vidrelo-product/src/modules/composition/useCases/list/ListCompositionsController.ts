import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCompositions } from './ListCompositions';

export class ListCompositionsController {
  async listAllActive(request: Request, response: Response): Promise<Response> {
    const params = request.query;

    const listItensUseCase = container.resolve(ListCompositions);
    const itens = await listItensUseCase.listAll({ ...params });

    return response.json(itens);
  }
}
