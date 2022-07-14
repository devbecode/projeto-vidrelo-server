import { Router } from 'express';

import { authRoutes } from '../../../../modules/auth/infra/http/auth.route';
import { userRoutes } from '../../../../modules/user/infra/http/user.routes';

const router = Router();

router.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

router.use('/auth', authRoutes);
router.use('/auth', userRoutes);

export { router };
