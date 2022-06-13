import { Item } from '@modules/item/domain/Item';

export class Budget {
  public static BUDGET_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  };

  public id: string;
  public status: string;
  public width: number;
  public heigth: number;
  public thickness: number;
  public depth: number;
  public amount: number;
  public createdAt: string;
  public updatedAt?: string;

  public items: Item[];
}
