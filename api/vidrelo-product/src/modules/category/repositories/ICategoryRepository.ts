import { Category } from '../domain/Category';
import { IPaginationDTO, IResponseListAllCategories } from '../dto/CategoryDTO';

export interface ICategoryRepository {
  save(category: Category): Promise<void>;
  findByName(category: Category): Promise<boolean>;
  findAll(pagination?: IPaginationDTO): Promise<IResponseListAllCategories>;
  findById(category: Category): Promise<boolean>;
  inactive(category: Category): Promise<void>;
}
