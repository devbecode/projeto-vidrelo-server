import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Company } from '@modules/company/domain/Company';

import { UpdateCompanyUseCase } from './UpdateCompanyUseCase';

export class UpdateCompanyController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const params = request.body;

    let company: Company = { ...params, id };

    const updateUseCase = container.resolve(UpdateCompanyUseCase);
    company = await updateUseCase.updateById(company);
    return response.json(company);
  }

  async inactive(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateUseCase = container.resolve(UpdateCompanyUseCase);
    await updateUseCase.updateStatus(id);
    return response.send();
  }
}
