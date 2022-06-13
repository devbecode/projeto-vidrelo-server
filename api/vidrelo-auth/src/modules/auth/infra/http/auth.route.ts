import { Router } from 'express';

import { AuthenticateController } from '@modules/auth/useCase/authenticate/AuthenticateController';

const authRoutes = Router();
const authenticateController = new AuthenticateController();

authRoutes.post('/', authenticateController.authenticate);

export { authRoutes };
