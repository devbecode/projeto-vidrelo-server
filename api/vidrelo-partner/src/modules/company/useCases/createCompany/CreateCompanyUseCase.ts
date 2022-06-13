import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { Company, STATUS_COMPANY } from '@modules/company/domain/Company';
import { ICreateCompanyDTO } from '@modules/company/dto/CompanyDTO';
import { ICompanyRepository } from '@modules/company/repositories/ICompanyRepository';
import { AppError } from '@shared/error/AppError';
import {
  checkCnpj,
  checkEmail,
  checkTelephone,
  formatDate,
} from '@shared/utils';

@injectable()
export class CreateCompanyUseCase {
  constructor(
    @inject('companyRepository')
    private repository: ICompanyRepository,
    @inject('company')
    private company: Company,
  ) {}

  async create(data: ICreateCompanyDTO): Promise<Company> {
    Object.assign(this.company, data);

    await this.checkIfExists();
    this.checkCompanyToCreate();

    Object.assign(this.company, {
      id: uuid(),
      status: STATUS_COMPANY.ACTIVE,
      created_at: formatDate(new Date().toISOString()),
    });

    await this.repository.save(this.company);
    return this.company;
  }

  private checkCompanyToCreate(): void {
    checkCnpj(this.company.cnpj);
    checkTelephone(this.company.telephone);
    checkEmail(this.company.email);
  }

  private async checkIfExists(): Promise<void> {
    if (await this.findByCnpj()) {
      throw new AppError(`Company ${this.company.cnpj} already exists`);
    }
  }

  async findByCnpj(): Promise<boolean> {
    return this.repository.findByCnpj(this.company);
  }
}
