import { Router } from 'express';

import { CreateController } from '@modules/user/useCases/create/CreateController';

const userRoutes = Router();
const userController = new CreateController();

userRoutes.post('/createUser', userController.create);

export { userRoutes };
