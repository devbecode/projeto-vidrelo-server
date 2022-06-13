import { inject, injectable } from 'tsyringe';

import {
  IFilterToListAllCompanies,
  IListAllCompaniesDTO,
} from '@modules/company/dto/CompanyDTO';
import { ICompanyRepository } from '@modules/company/repositories/ICompanyRepository';
import { formatDate } from '@shared/utils';

@injectable()
export class ListAllCompaniesUseCase {
  constructor(
    @inject('companyRepository')
    private repository: ICompanyRepository,
  ) {}

  async listAll(
    data: IFilterToListAllCompanies,
  ): Promise<IListAllCompaniesDTO> {
    const listCompanies = await this.repository.findAll(data);
    listCompanies.companies = listCompanies.companies.map(product => ({
      ...product,
      created_at: formatDate(new Date().toISOString()),
    }));

    return listCompanies;
  }
}
