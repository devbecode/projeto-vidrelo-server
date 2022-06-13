import { Product } from '@modules/product/domain/Product';
import { ProductRepositoryMemory } from '@modules/product/repositories/ProductRepositoryMemory';

import { CreateProductUseCase } from './CreateProductUseCase';

describe('Create Product Use Case', () => {
  it('Shold be able to create a new product', async () => {
    const newProduct = new Product();
    const repositoryMemory = new ProductRepositoryMemory();
    const createProductUseCase = new CreateProductUseCase(
      repositoryMemory,
      newProduct,
    );

    const product = await createProductUseCase.create({
      name: 'test',
      full_description: 'test',
      short_description: 'short',
      cover: 'Same Image',
      is_public: false,
      gallery: ['image', 'secondeImage'],
      installation: '20.15',
    });

    expect(product).toMatchObject({ name: 'test', full_description: 'test' });
  });
});
