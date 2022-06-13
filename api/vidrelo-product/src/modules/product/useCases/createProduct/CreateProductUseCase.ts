import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { Product, STATUS_PRODUCT } from '@modules/product/domain/Product';

import { ICreateProductDTO } from '../../dto/ProductDTO';
import { IProductRepository } from '../../repositories/IProductRepository';

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject('productRepository')
    private repository: IProductRepository,
    @inject('product')
    private product: Product,
  ) {}

  async create(data: ICreateProductDTO): Promise<Product> {
    const {
      name,
      full_description,
      short_description,
      cover,
      is_public,
      installation,
      gallery,
    } = data;
    Object.assign(this.product, {
      id: uuid(),
      name,
      status: STATUS_PRODUCT.ACTIVE,
      full_description,
      short_description,
      cover,
      installation,
      public: is_public,
      created_at: new Date().toString(),
    });

    this.buildGallery(gallery);

    await this.repository.save(this.product);
    return this.product;
  }

  // eslint-disable-next-line consistent-return
  private buildGallery(images?: string[]): void {
    if (images && images.length > 0) {
      this.product.gallery = images.map(gallery => {
        return {
          id: uuid(),
          created_at: new Date().toISOString(),
          image: gallery,
          product_id: this.product.id,
        };
      });
    }
  }
}
