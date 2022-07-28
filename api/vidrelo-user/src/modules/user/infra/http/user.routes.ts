import { Router } from 'express';

import { ChangePasswordController } from '@modules/user/useCases/changePassword/ChangePasswordController';
import { CreateController } from '@modules/user/useCases/create/CreateController';
import { ListController } from '@modules/user/useCases/listUsers/ListController';
import { UpdateController } from '@modules/user/useCases/update/UpdateController';
import { checkToken } from '@shared/infra/http/middlewares/auth';

const userRoutes = Router();

const createController = new CreateController();
const listController = new ListController();
const updateController = new UpdateController();

const changePassword = new ChangePasswordController();

userRoutes.post('/first-password', changePassword.changePassword);

userRoutes.post('/user', checkToken, createController.create);
userRoutes.get('/users', checkToken, listController.listAll);
userRoutes.get('/user/:id', checkToken, listController.fyndById);
userRoutes.get('/userMail/:email', listController.fyndByEmail);
userRoutes.patch('/user/:id', checkToken, updateController.updateById);
userRoutes.delete('/user/:id', checkToken, updateController.inactiveById);

export { userRoutes };
