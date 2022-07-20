import { Router } from 'express';

import { CreateController } from '@modules/user/useCases/create/CreateController';
import { UpdateController } from '@modules/user/useCases/update/UpdateController';
import { checkToken } from '@shared/infra/http/middlewares/auth';

const userRoutes = Router();
const userController = new CreateController();
const userUpateController = new UpdateController();

userRoutes.post('/createUser', userController.create);
userRoutes.delete(
  '/deleteUser/:id',
  checkToken,
  userUpateController.inactiveById,
);

export { userRoutes };
