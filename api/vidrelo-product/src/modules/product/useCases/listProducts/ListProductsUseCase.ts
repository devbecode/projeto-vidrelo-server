import moment from 'moment';
import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/product/domain/Product';
import {
  IListProducts,
  IResponseListAllProducts,
} from '@modules/product/dto/ProductDTO';
import { IProductRepository } from '@modules/product/repositories/IProductRepository';
import { AppError } from '@shared/error/AppError';

@injectable()
export class ListProductsUseCase {
  constructor(
    @inject('productRepository')
    private repository: IProductRepository,
    @inject('product')
    private product: Product,
  ) {}

  async listAll(data?: IListProducts): Promise<IResponseListAllProducts> {
    const listProducts = await this.repository.findAll(data);
    listProducts.products = listProducts.products.map(product => ({
      ...product,
      created_at: moment(product.created_at, 'YYYY-mm-dd').format(
        'YYYY-MM-DD HH:mm:ss',
      ),
    }));

    return listProducts;
  }

  async listAllPublic(data?: IListProducts): Promise<IResponseListAllProducts> {
    const listPublicProducts = await this.repository.findAllPublic(data);
    listPublicProducts.products = listPublicProducts.products.map(product => ({
      ...product,
      created_at: moment(product.created_at, 'YYYY-mm-dd').format(
        'YYYY-MM-DD HH:mm:ss',
      ),
    }));

    return listPublicProducts;
  }

  async findDetailsById(id: string): Promise<Product> {
    this.product.id = id;
    await this.checkIfNotExists();

    await this.repository.loadGalleryByProductId(this.product);
    return this.product;
  }

  async checkIfNotExists(): Promise<void> {
    if (!(await this.repository.findById(this.product))) {
      throw new AppError(
        `No product whit id ${this.product.id} was found`,
        400,
      );
    }
  }
}
