import { container } from 'tsyringe';

import { OrderRepository } from '@modules/order/infra/repositories/OrderRepository';

import { Order } from '../../../modules/order/domain/Order';

container.register('orderRepository', OrderRepository);
container.register('order', Order);
