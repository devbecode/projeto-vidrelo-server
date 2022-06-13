import { Company } from '@modules/company/domain/Company';
import { CompanyRepositoryMemory } from '@modules/company/repositories/CompanyRepositoryMemory';
import { ICompanyRepository } from '@modules/company/repositories/ICompanyRepository';
import { AppError } from '@shared/error/AppError';

import { CreateCompanyUseCase } from './CreateCompanyUseCase';

describe('Create a new company', () => {
  let createUseCase: CreateCompanyUseCase;
  const repositoryMemory = new CompanyRepositoryMemory();

  function mountCompany(): Company {
    let newCompany = new Company();
    newCompany = {
      id: 'c5c11562-a68f-404f-bf03-60485361e432',
      corporate_name: 'Some Company',
      status: 'active',
      responsible: 'Some people',
      cnpj: '87017979000199',
      telephone: '999999999',
      email: 'email@email.com',
      cep: '31555888',
      state: 'MG',
      city: 'Some City',
      district: 'Somewhere',
      street: 'Some street',
      number: '15',
      complement: '',
      created_at: '2022-01-11',
    };
    return newCompany;
  }

  test('Shold be able to create a new company', async () => {
    const company = mountCompany();
    company.id = '553e78e0-cd65-4633-9e39-56c5d5ea4789';

    createUseCase = new CreateCompanyUseCase(repositoryMemory, company);

    await expect(createUseCase.create(company)).rejects.toEqual({
      message: 'Company 87017979000199 already exists',
      statusCode: 400,
    });
  });

  test('CNPJ is not valid', async () => {
    const company = mountCompany();

    Object.assign(company, {
      id: 'e6e067f7-c3e2-485e-ab8d-d02f07c3b228',
      cnpj: '31556485412a',
    });

    createUseCase = new CreateCompanyUseCase(repositoryMemory, company);

    await expect(createUseCase.create(company)).rejects.toEqual({
      message:
        'The cnpj 31556485412a must have 14 characters and be only numbers',
      statusCode: 400,
    });
  });

  test('Telephone is not valid', async () => {
    const company = mountCompany();
    Object.assign(company, { telephone: '999999999a' });

    createUseCase = new CreateCompanyUseCase(repositoryMemory, company);

    await expect(createUseCase.create(company)).rejects.toEqual({
      message: 'The telephone 999999999a must be only numbers',
      statusCode: 400,
    });
  });

  test('Email is not valid', async () => {
    const company = mountCompany();
    Object.assign(company, { email: 'email.email.com' });

    createUseCase = new CreateCompanyUseCase(repositoryMemory, company);

    await expect(createUseCase.create(company)).rejects.toEqual({
      message: 'Email email.email.com is not valid',
      statusCode: 400,
    });
  });
});
