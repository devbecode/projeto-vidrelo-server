import { Router } from 'express';

import { CreateOrderController } from '@modules/order/useCases/create/CreateOrderController';
import { ListOrdersController } from '@modules/order/useCases/list/ListOrdersController';

const orderRoutes = Router();

const createController = new CreateOrderController();
const listController = new ListOrdersController();

orderRoutes.post('/order', createController.create);
orderRoutes.get('/orders', listController.listAll);

export { orderRoutes };
