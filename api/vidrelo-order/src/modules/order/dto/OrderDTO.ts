import { OrderEntity } from '../infra/entities/OrderEntity';

export interface IItem {
  category: string;
  item: string;
}

export interface IBudget {
  width: number;
  heigth: number;
  thickness: number;
  depth: number;
  amount: number;
  items: Array<IItem>;
}

export interface ICreateOrderDTO {
  number: number;
  userId: string;
  budgets: Array<IBudget>;
}

export interface IPaginationDTO {
  offset?: number;
  limit?: number;
}

export interface IResponseListAllOrder {
  metaData: {
    total: number;
    limit: number;
    page: number;
  };

  orders: Array<OrderEntity>;
}
