import { Item } from '@modules/item/domain/Item';

export class Composition {
  public id: string;
  public status: string;
  public hash: string;
  public created_at: string;
  public product_id: string;
  public item_id: string;
  public category_id: string;
  public itens_id: Array<string>;
  public itens?: Array<Item>;
}
