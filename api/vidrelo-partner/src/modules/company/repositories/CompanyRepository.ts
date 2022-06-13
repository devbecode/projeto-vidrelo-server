import { getRepository, Repository } from 'typeorm';

import { AppError } from '@shared/error/AppError';

import { Company, STATUS_COMPANY } from '../domain/Company';
import {
  IFilterToListAllCompanies,
  IListAllCompaniesDTO,
} from '../dto/CompanyDTO';
import { CompanyEntity } from '../infra/entities/CompanyEntity';
import { ICompanyRepository } from './ICompanyRepository';

export class CompanyRepository implements ICompanyRepository {
  private repository: Repository<CompanyEntity>;

  constructor() {
    this.repository = getRepository(CompanyEntity);
  }

  async updateCompanyById(company: Company): Promise<void> {
    const { affected } = await this.repository.update(
      { id: company.id },
      { ...company },
    );

    if (!affected) {
      throw new AppError(`No product was updated to id ${company.id}`, 500);
    }
  }

  async findById(company: Company): Promise<boolean> {
    const record = await this.repository.findOne({ where: { id: company.id } });

    if (!record) {
      return false;
    }

    Object.assign(company, record);
    return true;
  }

  async findAll(
    filters: IFilterToListAllCompanies,
  ): Promise<IListAllCompaniesDTO> {
    const { limit } = filters;
    let { offset } = filters;

    if (offset) {
      offset = offset.toString() === '1' ? null : (offset - 1) * limit;
    }

    const [companies, count] = await this.repository
      .createQueryBuilder('company')
      .where('company.status = :status', { status: STATUS_COMPANY.ACTIVE })
      .skip(offset)
      .take(limit)
      .orderBy('company.corporate_name', 'ASC')
      .getManyAndCount();

    const metaData = {
      total: count,
      limit,
      page: offset,
    };

    return { metaData, companies };
  }

  async save(company: Company): Promise<void> {
    await this.repository.save(company);
  }

  async findByCnpj(company: Company): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { cnpj: company.cnpj },
    });

    if (!record) {
      return false;
    }

    Object.assign(company, { ...company });
    return true;
  }
}
