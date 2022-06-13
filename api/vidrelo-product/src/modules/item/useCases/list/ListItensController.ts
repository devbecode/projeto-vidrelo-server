import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListItens } from './ListItens';

export class ListItensController {
  async listAllActive(request: Request, response: Response): Promise<Response> {
    const params = request.query;

    const listItensUseCase = container.resolve(ListItens);
    const itens = await listItensUseCase.listAll({ ...params });

    return response.json(itens);
  }

  async findDetailsById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const listItemDetails = container.resolve(ListItens);
    const item = await listItemDetails.findDetailsById(id);

    return response.json(item);
  }
}
