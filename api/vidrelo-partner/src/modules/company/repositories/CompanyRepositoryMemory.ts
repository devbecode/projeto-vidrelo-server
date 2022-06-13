import { Company } from '../domain/Company';
import {
  IFilterToListAllCompanies,
  IListAllCompaniesDTO,
} from '../dto/CompanyDTO';
import { ICompanyRepository } from './ICompanyRepository';

export class CompanyRepositoryMemory implements ICompanyRepository {
  async findByCnpj(company: Company): Promise<boolean> {
    if (company.id === '553e78e0-cd65-4633-9e39-56c5d5ea4789') {
      return true;
    }

    return false;
  }

  async save(company: Company): Promise<void> {}

  async findAll(
    filters: IFilterToListAllCompanies,
  ): Promise<IListAllCompaniesDTO> {
    throw new Error('Method not implemented.');
  }

  async findById(company: Company): Promise<boolean> {
    return false;
  }

  async updateCompanyById(company: Company): Promise<void> {}
}
