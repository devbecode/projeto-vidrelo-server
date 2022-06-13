import { Router } from 'express';

import { userRoutes } from '@modules/user/infra/http/user.routes';

const router = Router();

router.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

router.use(userRoutes);

export { router };
