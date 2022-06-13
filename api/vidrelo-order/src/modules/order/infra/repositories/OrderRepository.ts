import { getRepository, Repository } from 'typeorm';

import { Budget } from '@modules/budget/domain/Budget';
import { BudgetEntity } from '@modules/budget/infra/entities/BudgetEntity';
import { Item } from '@modules/item/domain/Item';
import { ItemEntity } from '@modules/item/infra/entities/ItemEntity';
import { Order } from '@modules/order/domain/Order';
import {
  IPaginationDTO,
  IResponseListAllOrder,
} from '@modules/order/dto/OrderDTO';
import { AppError } from '@shared/error/AppError';

import { OrderEntity } from '../entities/OrderEntity';
import { IOrderRepository } from './IOrderRepository';

export class OrderRepository implements IOrderRepository {
  private repository: Repository<OrderEntity>;

  constructor() {
    this.repository = getRepository(OrderEntity);
  }

  public async findAll(
    pagination: IPaginationDTO,
    userId: string,
  ): Promise<IResponseListAllOrder> {
    const { offset, limit } = pagination;

    const skip: number = offset
      ? (pagination.offset - 1) * pagination.limit
      : undefined;

    const [orders, count] = await this.repository
      .createQueryBuilder('order')
      .where('order.status = :status AND order.user_id = :user_id', {
        status: Order.ORDER_STATUS.ACTIVE,
        user_id: userId,
      })
      .skip(skip)
      .take(pagination.limit)
      .orderBy('order.number')
      .getManyAndCount();

    const metaData = {
      total: count,
      limit,
      page: offset,
    };

    return { metaData, orders };
  }

  public async save(order: Order): Promise<void> {
    try {
      await this.repository.save({
        created_at: order.createdAt,
        user_id: order.userId,
        ...order,
      });
      await this.saveBudgetsAndItems(order.budgets, order.id);
    } catch (error) {
      throw new AppError(
        `No has possible save the orders, please contact our support ${error}`,
        500,
      );
    }
  }

  private async saveBudgetsAndItems(
    budgets: Budget[],
    orderId: string,
  ): Promise<void> {
    budgets.map(async (budget: Budget) => {
      await this.saveItems(budget.items, budget.id);
      await getRepository(BudgetEntity).save({
        order_id: orderId,
        created_at: budget.createdAt,
        ...budget,
      });
    });
  }

  private async saveItems(item: Item[], budget_id: string): Promise<void> {
    item.map(async (item: Item) => {
      await getRepository(ItemEntity).save({
        budget_id,
        created_at: item.createdAt,
        ...item,
      });
    });
  }

  public async findByNumber(order: Order): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { number: order.number },
    });

    Object.assign(order, record);

    return !!record;
  }
}
