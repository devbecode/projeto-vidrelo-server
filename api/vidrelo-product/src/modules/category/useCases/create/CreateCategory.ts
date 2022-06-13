import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Category, CATEGORY_STATUS } from '@modules/category/domain/Category';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
import { AppError } from '@shared/error/AppError';
import { checkEachStringLength } from '@shared/infra/utils';

@injectable()
export class CreateCategory {
  constructor(
    @inject('categoryRepository')
    private repository: ICategoryRepository,
    @inject('category')
    private category: Category,
  ) {}

  public async create(name: string): Promise<Category> {
    Object.assign(this.category, {
      id: v4(),
      name,
      status: CATEGORY_STATUS.ACTIVE,
      createdAt: new Date().toDateString(),
    });

    await this.checkIfExists();
    this.checkToCreate();
    await this.repository.save(this.category);

    return this.category;
  }

  private async checkIfExists(): Promise<void> {
    if (await this.repository.findByName(this.category)) {
      throw new AppError(
        `Category already exists to name ${this.category.name}`,
        400,
      );
    }
  }

  private checkToCreate(): void {
    checkEachStringLength([{ 150: this.category.name }]);
  }
}
