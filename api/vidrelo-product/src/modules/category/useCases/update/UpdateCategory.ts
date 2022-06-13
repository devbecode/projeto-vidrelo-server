import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/category/domain/Category';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
import { AppError } from '@shared/error/AppError';

@injectable()
export class UpdateCategory {
  constructor(
    @inject('categoryRepository')
    private repository: ICategoryRepository,
    @inject('category')
    private category: Category,
  ) {}

  public async inactive(id: string): Promise<void> {
    this.category.id = id;
    await this.checkIfExists();
    await this.repository.inactive(this.category);
  }

  private async checkIfExists(): Promise<void> {
    if (!(await this.repository.findById(this.category))) {
      throw new AppError(`No category was found to id ${this.category.id}`);
    }
  }
}
