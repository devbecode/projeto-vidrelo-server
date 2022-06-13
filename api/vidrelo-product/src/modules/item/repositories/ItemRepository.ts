import { getRepository, Repository } from 'typeorm';

import { CategoryEntity } from '@modules/category/infra/entities/CategoryEntity';
import { GalleryEntity } from '@modules/gallery/entities/GalleryEntity';
import { ProductEntity } from '@modules/product/infra/entities/ProductEntity';
import { AppError } from '@shared/error/AppError';

import { Item, STATUS_ITEM } from '../domain/Item';
import { IFilterListItensDTO, IResponseListAllItensDTO } from '../dto/ItemDTO';
import { ItemEntity } from '../infra/entities/ItemEntity';
import { IItemRepository } from './IItemRepository';

export class ItemRepository implements IItemRepository {
  private repository: Repository<ItemEntity>;
  constructor() {
    this.repository = getRepository(ItemEntity);
  }

  public async loadGalleryByItemId(item: Item): Promise<void> {
    const record = await getRepository(GalleryEntity).find({
      where: { item_id: item.id },
    });

    if (!record) {
      throw new AppError(`No gallery was found to item id ${item.id}`, 400);
    }

    // eslint-disable-next-line no-param-reassign
    item.gallery = record;
  }

  async inactiveById(item: Item): Promise<void> {
    const { affected } = await this.repository.update(
      { id: item.id },
      { status: STATUS_ITEM.INACTIVE },
    );

    if (!affected) {
      throw new AppError(`No item value was updated to id ${item.id}`, 500);
    }
  }

  async findById(item: Item): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { id: item.id },
    });

    if (record) {
      Object.assign(item, record);
      return true;
    }

    return false;
  }

  async findAll(
    pagination: IFilterListItensDTO,
  ): Promise<IResponseListAllItensDTO> {
    const { offset, limit } = pagination;

    const skip: number = offset
      ? (pagination.offset - 1) * pagination.limit
      : undefined;

    const [itens, count] = await this.repository
      .createQueryBuilder('item')
      .where('item.status = :status', {
        status: STATUS_ITEM.ACTIVE,
      })
      .skip(skip)
      .take(pagination.limit)
      .orderBy('item.name')
      .getManyAndCount();

    const metaData = {
      total: count,
      limit,
      page: offset,
    };

    return { metaData, itens };
  }

  async save(item: Item): Promise<void> {
    try {
      await this.repository.save(item);
      console.log(item);

      item.gallery.forEach(async image => {
        console.log(image);
        await getRepository(GalleryEntity).save(image);
      });
    } catch (error) {
      throw new AppError(`No has possible save item, error: ${error}`, 500);
    }
  }

  async findProductById(productId: string): Promise<boolean> {
    const record = await getRepository(ProductEntity).findOne({
      where: { id: productId },
    });

    if (!record) {
      return false;
    }

    return true;
  }

  async findCategoryById(categoryId: string): Promise<boolean> {
    const record = await getRepository(CategoryEntity).findOne({
      where: { id: categoryId },
    });

    if (!record) {
      return false;
    }

    return true;
  }

  async findByHash(item: Item): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { hash: item.hash },
    });

    if (!record) {
      return false;
    }

    Object.assign(item, record);
    return true;
  }
}
