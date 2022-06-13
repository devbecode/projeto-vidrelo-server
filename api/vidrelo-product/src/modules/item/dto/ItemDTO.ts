import { ItemEntity } from '../infra/entities/ItemEntity';

export interface ICreateItemDTO {
  measure: string;
  name: string;
  categoryId: string;
  value: string;
  gallery: Array<string>;
}

export interface IFilterListItensDTO {
  offset?: number;
  limit?: number;
}

export interface IResponseListAllItensDTO {
  metaData: {
    total: number;
    limit: number;
    page: number;
  };

  itens: Array<ItemEntity>;
}

export interface IUpdateItemDTO {
  thickness: string;
  measure: string;
  name: string;
  accessory_id: string;
  product_id: string;
  price: number;
}
