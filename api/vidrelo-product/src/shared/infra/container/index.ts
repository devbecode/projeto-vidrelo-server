import { container } from 'tsyringe';

import { Category } from '@modules/category/domain/Category';
import { CategoryRepository } from '@modules/category/repositories/CategoryRepository';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
import { Composition } from '@modules/composition/domain/Composition';
import { CompositionRepository } from '@modules/composition/repositories/CompositionRepository';
import { ICompositionRepository } from '@modules/composition/repositories/ICompositionRepository';
import { Item } from '@modules/item/domain/Item';
import { IItemRepository } from '@modules/item/repositories/IItemRepository';
import { ItemRepository } from '@modules/item/repositories/ItemRepository';
import { Product } from '@modules/product/domain/Product';
import { IProductRepository } from '@modules/product/repositories/IProductRepository';
import { ProductRepository } from '@modules/product/repositories/ProductRepository';

container.registerSingleton<IProductRepository>(
  'productRepository',
  ProductRepository,
);

container.registerSingleton<IItemRepository>('itemRepository', ItemRepository);
container.registerSingleton<ICompositionRepository>(
  'compositionRepository',
  CompositionRepository,
);
container.register<ICategoryRepository>(
  'categoryRepository',
  CategoryRepository,
);

container.registerSingleton('product', Product);
container.registerSingleton('item', Item);
container.registerSingleton('composition', Composition);
container.registerSingleton('category', Category);
