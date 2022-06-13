import { Router } from 'express';

import { authRoutes } from '../../../../modules/auth/infra/http/auth.route';

const router = Router();

router.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

router.use('/auth', authRoutes);

export { router };
