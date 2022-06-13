import { Item } from '@modules/item/domain/Item';

import { CompositionEntity } from '../infra/entities/CompositionEntity';

export interface ICreateCompositionDTO {
  itens_id: Array<string>;
  product_id: string;
  category_id: string;
}

export interface IListCompostionsDTO {
  offset?: number;
  limit?: number;
  productId?: string;
  category_id?: string;
}

export interface ICompositionsDTO {
  id: string;
  product_id: string;
  itens: Array<Item>;
}

export interface IResponseListAllCompositions {
  metaData: {
    total: number;
    limit: number;
    page: number;
  };

  compositions: Array<CompositionEntity>;
}
