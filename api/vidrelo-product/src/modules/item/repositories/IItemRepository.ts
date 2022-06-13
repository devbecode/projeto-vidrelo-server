import { Item } from '../domain/Item';
import { IFilterListItensDTO, IResponseListAllItensDTO } from '../dto/ItemDTO';

export interface IItemRepository {
  findByHash(item: Item): Promise<boolean>;
  findProductById(productId: string): Promise<boolean>;
  findCategoryById(categoryId: string): Promise<boolean>;
  findAll(pagination: IFilterListItensDTO): Promise<IResponseListAllItensDTO>;
  save(item: Item): Promise<void>;
  findById(item: Item): Promise<boolean>;
  inactiveById(item: Item): Promise<void>;
  loadGalleryByItemId(item: Item): Promise<void>;
}
