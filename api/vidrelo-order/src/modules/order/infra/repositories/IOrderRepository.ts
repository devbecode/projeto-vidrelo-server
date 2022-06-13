import { Order } from '@modules/order/domain/Order';
import {
  IPaginationDTO,
  IResponseListAllOrder,
} from '@modules/order/dto/OrderDTO';

export interface IOrderRepository {
  save(order: Order): Promise<void>;
  findByNumber(order: Order): Promise<boolean>;
  findAll(
    pagination: IPaginationDTO,
    userId: string,
  ): Promise<IResponseListAllOrder>;
}
