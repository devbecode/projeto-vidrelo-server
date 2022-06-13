import { inject, injectable } from 'tsyringe';

import { Company, STATUS_COMPANY } from '@modules/company/domain/Company';
import { ICompanyRepository } from '@modules/company/repositories/ICompanyRepository';
import { AppError } from '@shared/error/AppError';
import {
  checkCep,
  checkEachStringLength,
  checkEmail,
  checkTelephone,
} from '@shared/utils';

@injectable()
export class UpdateCompanyUseCase {
  constructor(
    @inject('companyRepository')
    private repository: ICompanyRepository,
    @inject('company')
    private company: Company,
  ) {}

  public async updateStatus(id: string): Promise<void> {
    this.company.id = id;
    await this.checkIfExists();

    this.company.status = STATUS_COMPANY.INACTIVE;
    await this.repository.updateCompanyById(this.company);
  }

  public async updateById(updatedCompany: Company): Promise<Company> {
    this.company.id = updatedCompany.id;
    await this.checkIfExists();

    Object.assign(this.company, updatedCompany);
    await this.verifyCompanyToUpdate();

    await this.repository.updateCompanyById(this.company);
    return this.company;
  }

  private async verifyCompanyToUpdate(): Promise<void> {
    const {
      corporate_name,
      telephone,
      email,
      cep,
      state,
      city,
      district,
      street,
      number,
      complement,
    } = this.company;
    const strings = [
      { '255': corporate_name },
      { '40': telephone },
      { '60': email },
      { '20': cep },
      { '5': state },
      { '100': city },
      { '100': district },
      { '100': street },
      { '5': number },
      { '100': complement },
    ];

    checkTelephone(this.company.telephone);
    checkEmail(this.company.email);
    checkCep(this.company.cep);
    checkEachStringLength(strings);
  }

  private async checkIfExists(): Promise<void> {
    if (!(await this.findById())) {
      throw new AppError(`No company was found to id ${this.company.id}`, 400);
    }
  }

  private async findById(): Promise<boolean> {
    return this.repository.findById(this.company);
  }
}
