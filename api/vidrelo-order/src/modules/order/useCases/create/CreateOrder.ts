/* eslint-disable no-param-reassign */
import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Budget } from '@modules/budget/domain/Budget';
import { Item } from '@modules/item/domain/Item';
import { Order } from '@modules/order/domain/Order';
import { ICreateOrderDTO, IBudget } from '@modules/order/dto/OrderDTO';
import { IOrderRepository } from '@modules/order/infra/repositories/IOrderRepository';
import { AppError } from '@shared/error/AppError';

@injectable()
export class CreateOrder {
  constructor(
    @inject('orderRepository')
    public repository: IOrderRepository,
    @inject('order')
    public order: Order,
  ) {}

  public async create(data: ICreateOrderDTO): Promise<void> {
    this.order.number = data.number;
    this.order.userId = data.userId;
    this.order.budgets = [];

    await this.checkIfExists();

    this.mountOrder();
    this.checkBudgets(data.budgets);

    await this.repository.save(this.order);
  }

  private mountOrder(): void {
    this.order = {
      id: v4(),
      status: Order.ORDER_STATUS.ACTIVE,
      createdAt: new Date().toDateString(),
      ...this.order,
    };
  }

  private checkBudgets(budgets: IBudget[]): void {
    // eslint-disable-next-line array-callback-return
    budgets.map((budget: Budget) => {
      this.checkIsOnlyNumbers(budget);
      budget = this.mountBudget(budget);
      budget.items = this.mountItems(budget.items);
      this.order.budgets.push(budget);
    });
  }

  private mountBudget(budget: Budget): Budget {
    return {
      id: v4(),
      status: Budget.BUDGET_STATUS.ACTIVE,
      createdAt: new Date().toDateString(),
      ...budget,
    };
  }

  private mountItems(item: Item[]): Item[] {
    const items = item.map((item: Item) => {
      return {
        id: v4(),
        status: Item.ITEM_STATUS.ACTIVE,
        createdAt: new Date().toDateString(),
        ...item,
      };
    });

    return items;
  }

  private checkIsOnlyNumbers(budget: Budget): void {
    const { width, heigth, depth, thickness, amount } = budget;
    const toValid = { width, heigth, depth, thickness, amount };

    // eslint-disable-next-line no-restricted-syntax
    for (const element of Object.keys(toValid)) {
      if (toValid[element] <= 0) {
        throw new AppError(
          `The value of ${element} cannot be less than zero`,
          400,
        );
      }
    }
  }

  private async checkIfExists(): Promise<void> {
    if (await this.repository.findByNumber(this.order)) {
      throw new AppError(
        `The order already exists to number ${this.order.number}`,
        400,
      );
    }
  }
}
