import { Router } from 'express';

import { categoryRoutes } from '@modules/category/infra/http/category.route';
import { compositionRoutes } from '@modules/composition/infra/http/composition.routes';
import { itemRoutes } from '@modules/item/infra/http/item.route';
import { productRoutes } from '@modules/product/infra/http/product.routes';

const router = Router();

router.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

router.use('/', productRoutes, itemRoutes, compositionRoutes, categoryRoutes);

export { router };
