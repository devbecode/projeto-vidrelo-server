import { Budget } from '@modules/budget/domain/Budget';

export class Order {
  public static ORDER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  };

  public id: string;
  public status: string;
  public number: number;
  public createdAt: string;
  public updatedAt: string;

  public userId: string;
  public budgets: Budget[];
}
