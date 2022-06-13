import { getRepository, Repository } from 'typeorm';

import { AppError } from '@shared/error/AppError';

import { Category } from '../domain/Category';
import { IPaginationDTO, IResponseListAllCategories } from '../dto/CategoryDTO';
import { CategoryEntity } from '../infra/entities/CategoryEntity';
import { ICategoryRepository } from './ICategoryRepository';

export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<CategoryEntity>;

  constructor() {
    this.repository = getRepository(CategoryEntity);
  }

  public async findById(category: Category): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { id: category.id },
    });

    return !!record;
  }

  public async inactive(category: Category): Promise<void> {
    const { affected } = await this.repository.update(
      { id: category.id },
      { status: 'inactive' },
    );

    if (!affected) {
      throw new AppError(
        `No category value was updated to id ${category.id}`,
        500,
      );
    }
  }

  public async findAll(
    pagination?: IPaginationDTO,
  ): Promise<IResponseListAllCategories> {
    const { offset, limit } = pagination;

    const skip: number = offset ? (offset - 1) * limit : undefined;

    const [categories, count] = await this.repository
      .createQueryBuilder('category')
      .where('category.status = :status', {
        status: 'active',
      })
      .skip(skip)
      .take(limit)
      .orderBy('category.id')
      .getManyAndCount();

    const metaData = {
      total: count,
      limit,
      page: offset,
    };

    return { metaData, categories };
  }

  public async save(category: Category): Promise<void> {
    await this.repository.save({
      created_at: category.createdAt,
      ...category,
    });
  }

  public async findByName(category: Category): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { name: category.name },
    });

    return !!record;
  }
}
