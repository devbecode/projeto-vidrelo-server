import moment from 'moment';
import { inject, injectable } from 'tsyringe';

import { Order } from '@modules/order/domain/Order';
import {
  IPaginationDTO,
  IResponseListAllOrder,
} from '@modules/order/dto/OrderDTO';
import { IOrderRepository } from '@modules/order/infra/repositories/IOrderRepository';

@injectable()
export class ListOrders {
  constructor(
    @inject('orderRepository')
    private repository: IOrderRepository,
  ) {}

  public async listAll(
    pagination: IPaginationDTO,
    userId: string,
  ): Promise<IResponseListAllOrder> {
    const listOrders = await this.repository.findAll(pagination, userId);

    listOrders.orders = listOrders.orders.map(order => {
      return {
        ...order,
        created_at: moment(order.created_at, 'YYYY-mm-dd').format('YYYY-MM-DD'),
        updated_at: moment(order.updated_at, 'YYYY-mm-dd').format('YYYY-MM-DD'),
      };
    });

    return listOrders;
  }
}
