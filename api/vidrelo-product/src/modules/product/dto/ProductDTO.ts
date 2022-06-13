import { Gallery } from '@modules/gallery/domain/Gallery';

import { ProductEntity } from '../infra/entities/ProductEntity';

export interface ICreateProductDTO {
  name: string;
  full_description: string;
  short_description: string;
  cover: string;
  installation: string;
  is_public?: boolean;
  gallery: string[];
}

export interface IListProducts {
  offset?: number;
  limit?: number;
}

export interface IResponseListAllProducts {
  metaData: {
    total: number;
    limit: number;
    page: number;
  };

  products: Array<ProductEntity>;
}

export interface IUpdateProductDTO {
  id: string;
  name: string;
  full_description: string;
  short_description: string;
  installation?: string;
  gallery: Array<Gallery>;
}
