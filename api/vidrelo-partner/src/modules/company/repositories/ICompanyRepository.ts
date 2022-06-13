import { Company } from '../domain/Company';
import {
  IFilterToListAllCompanies,
  IListAllCompaniesDTO,
} from '../dto/CompanyDTO';

export interface ICompanyRepository {
  findByCnpj(company: Company): Promise<boolean>;
  save(company: Company): Promise<void>;
  findAll(filters: IFilterToListAllCompanies): Promise<IListAllCompaniesDTO>;
  findById(company: Company): Promise<boolean>;
  updateCompanyById(company: Company): Promise<void>;
}
