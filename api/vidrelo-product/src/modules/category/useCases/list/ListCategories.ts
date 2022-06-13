import { inject, injectable } from 'tsyringe';

import {
  IPaginationDTO,
  IResponseListAllCategories,
} from '@modules/category/dto/CategoryDTO';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';

@injectable()
export class ListCategories {
  constructor(
    @inject('categoryRepository')
    private repository: ICategoryRepository,
  ) {}

  public async listAll(
    pagination?: IPaginationDTO,
  ): Promise<IResponseListAllCategories> {
    return this.repository.findAll(pagination);
  }
}
