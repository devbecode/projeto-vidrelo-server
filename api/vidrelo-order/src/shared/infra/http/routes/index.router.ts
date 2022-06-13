import { Router } from 'express';

import { orderRoutes } from '@modules/order/infra/http/order.routes';

const router = Router();

router.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

router.use(orderRoutes);

export { router };
