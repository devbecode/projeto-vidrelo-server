import { Router } from 'express';

import { companyRoutes } from '../../../../modules/company/infra/http/company.routes';
import { checkToken } from '../middlewares/auth';

const router = Router();

router.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

router.use(checkToken, companyRoutes);

export { router };
