import { Router } from 'express';

import { CreateCategoryController } from '@modules/category/useCases/create/CreateCategoryController';
import { ListCategoriesController } from '@modules/category/useCases/list/ListCategoryController';
import { UpdateCategoryController } from '@modules/category/useCases/update/UpdateCategoryController';
import { checkToken } from '@shared/infra/http/middlewares/auth';

const categoryRoutes = Router();

const createController = new CreateCategoryController();
const listController = new ListCategoriesController();
const updateController = new UpdateCategoryController();

categoryRoutes.post('/category', checkToken, createController.create);
categoryRoutes.get('/categories', checkToken, listController.listaAll);
categoryRoutes.delete('/category/:id', checkToken, updateController.inactive);

export { categoryRoutes };
