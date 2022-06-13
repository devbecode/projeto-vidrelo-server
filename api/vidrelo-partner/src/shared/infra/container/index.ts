import { container } from 'tsyringe';

import { Company } from '@modules/company/domain/Company';
import { CompanyRepository } from '@modules/company/repositories/CompanyRepository';
import { ICompanyRepository } from '@modules/company/repositories/ICompanyRepository';

container.registerSingleton<ICompanyRepository>(
  'companyRepository',
  CompanyRepository,
);

container.registerSingleton<Company>('company', Company);
