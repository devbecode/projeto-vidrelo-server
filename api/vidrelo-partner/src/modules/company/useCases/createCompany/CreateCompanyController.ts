import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Company } from '@modules/company/domain/Company';

import { CreateCompanyUseCase } from './CreateCompanyUseCase';

export class CreateCompanyController {
  async create(request: Request, response: Response): Promise<Response> {
    let company: Company = { ...request.body };

    const createCompany = container.resolve(CreateCompanyUseCase);
    company = await createCompany.create(company);
    return response.json(company);
  }
}
