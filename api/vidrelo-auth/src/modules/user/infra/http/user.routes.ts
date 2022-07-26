import { Router } from 'express';

import { CreateController } from '@modules/user/useCases/create/CreateController';
import { UpdateController } from '@modules/user/useCases/update/UpdateController';
import { checkToken } from '@shared/infra/http/middlewares/auth';
import { VerifyController } from '@modules/user/useCases/verifyCredentials/VerifyController';

const userRoutes = Router();
const userController = new CreateController();
const userUpateController = new UpdateController();
const verifyController = new VerifyController();

userRoutes.post('/createUser', userController.create);
userRoutes.post('/updateUserPassword', userUpateController.updatePasswordById);
userRoutes.post('/verifyCredentials', verifyController.verifyCredentials);
userRoutes.delete(
  '/deleteUser/:id',
  checkToken,
  userUpateController.inactiveById,
);

export { userRoutes };
