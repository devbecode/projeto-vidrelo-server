import { Gallery } from '@modules/gallery/domain/Gallery';

export enum STATUS_PRODUCT {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class Product {
  public id: string;
  public status: string;
  public name: string;
  public full_description: string;
  public short_description: string;
  public cover: string;
  public public?: boolean;
  public installation: string;
  public gallery?: Gallery[];
  public created_at: string;
}
