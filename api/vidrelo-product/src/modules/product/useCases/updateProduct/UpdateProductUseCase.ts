import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/product/domain/Product';
import { IUpdateProductDTO } from '@modules/product/dto/ProductDTO';
import { IProductRepository } from '@modules/product/repositories/IProductRepository';
import { AppError } from '@shared/error/AppError';

@injectable()
export class UpdateProductUseCase {
  constructor(
    @inject('productRepository')
    private repository: IProductRepository,
    @inject('product')
    private product: Product,
  ) {}

  async updateById(data: IUpdateProductDTO): Promise<Product> {
    const {
      id,
      name,
      full_description,
      short_description,
      gallery,
      installation,
    } = data;
    this.product.id = id;
    await this.checkIfExists();

    Object.assign(this.product, {
      id,
      name,
      full_description,
      short_description,
      installation,
      gallery,
    });

    await this.updateProductById();
    return this.product;
  }

  private async checkIfExists(): Promise<void> {
    if (!(await this.repository.findById(this.product))) {
      throw new AppError(`No product was found to id ${this.product.id}`, 400);
    }
  }

  private async updateProductById(): Promise<void> {
    await this.repository.updateById(this.product);
  }

  async inactive(id: string): Promise<void> {
    Object.assign(this.product, { id });
    await this.checkIfExists();
    await this.inactiveById();
  }

  private async inactiveById(): Promise<void> {
    await this.repository.inactiveById(this.product);
  }
}
