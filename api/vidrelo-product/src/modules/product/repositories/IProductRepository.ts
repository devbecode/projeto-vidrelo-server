import { Product } from '../domain/Product';
import { IListProducts, IResponseListAllProducts } from '../dto/ProductDTO';

export interface IProductRepository {
  save(product: Product): Promise<void>;
  findAll(pagination: IListProducts): Promise<IResponseListAllProducts>;
  findById(product: Product): Promise<boolean>;
  updateById(product: Product): Promise<void>;
  inactiveById(product: Product): Promise<void>;
  findAllPublic(pagination: IListProducts): Promise<IResponseListAllProducts>;
  loadGalleryByProductId(product: Product): Promise<void>;
}
