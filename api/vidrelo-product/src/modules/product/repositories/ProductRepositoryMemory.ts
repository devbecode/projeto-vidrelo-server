import { Product } from '../domain/Product';
import { IListProducts, IResponseListAllProducts } from '../dto/ProductDTO';
import { IProductRepository } from './IProductRepository';

export class ProductRepositoryMemory implements IProductRepository {
  async loadGalleryByProductId(product: Product): Promise<void> {
    // eslint-disable-next-line no-param-reassign
    product.gallery = [
      {
        id: '339e897f-6c2b-477a-860b-f700df91d069',
        image: 'Azure url link',
        product_id: '339e897f-6c2b-477a-860b-f700df91d010',
        created_at: '2022-31-01',
      },
    ];
  }

  async findAllPublic(
    pagination: IListProducts,
  ): Promise<IResponseListAllProducts> {
    throw new Error('Method not implemented.');
  }

  async save(product: Product): Promise<void> {}

  async findAll(pagination: IListProducts): Promise<IResponseListAllProducts> {
    const product = {
      id: '49ff1c6e-d265-49b1-babd-31acc141b6bd',
      status: 'active',
      name: 'Integration teste',
      full_description: 'Integration teste',
      short_description: 'Short',
      cover: 'Azure Storage url link',
      public: false,
      installation: '250',
      created_at: '2.021-02-19',
    };

    const response = {
      metaData: {
        total: 1,
        limit: 1,
        page: 1,
      },
      products: [product],
    };

    return response;
  }

  async findById(product: Product): Promise<boolean> {
    return false;
  }

  updateById(product: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }

  inactiveById(product: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
