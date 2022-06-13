import { Router } from 'express';

import { CreateCompanyController } from '@modules/company/useCases/createCompany/CreateCompanyController';
import { ListAllCompaniesController } from '@modules/company/useCases/listCompanies/ListAllCompaniesController';
import { UpdateCompanyController } from '@modules/company/useCases/updateCompany/UpdateCompanyController';

const companyRoutes = Router();

const createCompanyController = new CreateCompanyController();
const listAllCompaniesController = new ListAllCompaniesController();
const updateCompanyController = new UpdateCompanyController();

companyRoutes.post('/partner', createCompanyController.create);
companyRoutes.get('/partners', listAllCompaniesController.listAll);
companyRoutes.patch('/partner/:id', updateCompanyController.update);
companyRoutes.delete('/partner/:id', updateCompanyController.inactive);

export { companyRoutes };
