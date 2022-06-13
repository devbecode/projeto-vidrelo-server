import { Product } from '@modules/product/domain/Product';
import { ProductRepositoryMemory } from '@modules/product/repositories/ProductRepositoryMemory';
import { ListProductsUseCase } from '@modules/product/useCases/listProducts/ListProductsUseCase';

describe('List products use case', () => {
  it('Shold be list all active products', async () => {
    const repositoryMemory = new ProductRepositoryMemory();
    const product = new Product();
    const listUseCase = new ListProductsUseCase(repositoryMemory, product);

    const allProducts = await listUseCase.listAll();
    expect(allProducts.products).toBeInstanceOf(Array);
  });
});
