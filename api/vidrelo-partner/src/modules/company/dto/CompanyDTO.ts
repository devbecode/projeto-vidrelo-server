import { Company } from '../domain/Company';

export interface ICreateCompanyDTO {
  corporate_name: string;
  responsible: string;
  cnpj: string;
  telephone: string;
  email: string;
  cep: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement?: string;
}

export interface IListAllCompaniesDTO {
  metaData: {
    total: number;
    limit: number;
    page: number;
  };

  companies: Array<Company>;
}

export interface IFilterToListAllCompanies {
  offset?: number;
  limit?: number;
  status?: string;
}
