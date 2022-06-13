import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllCompaniesUseCase } from './ListAllCompaniesUseCase';

export class ListAllCompaniesController {
  async listAll(request: Request, response: Response): Promise<Response> {
    const params = request.query;

    const listCompaniesUseCase = container.resolve(ListAllCompaniesUseCase);
    const listCompanies = await listCompaniesUseCase.listAll(params);

    return response.json(listCompanies);
  }
}
