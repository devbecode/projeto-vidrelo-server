import { Gallery } from '@modules/gallery/domain/Gallery';

export enum MEASURE_TYPE {
  METER = 'meter',
  UNITY = 'unity',
}

export enum STATUS_ITEM {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class Item {
  public id: string;
  public name: string;
  public status: string;
  public measure: string;
  public value: string;
  public created_at: string;
  public category_id: string;
  public productId: string;
  public itemId: string;

  public hash?: string;
  public gallery?: Array<Gallery>;
}
