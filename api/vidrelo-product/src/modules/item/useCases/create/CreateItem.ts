import crypto from 'crypto';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { Gallery } from '@modules/gallery/domain/Gallery';
import { Item, MEASURE_TYPE, STATUS_ITEM } from '@modules/item/domain/Item';
import { ICreateItemDTO } from '@modules/item/dto/ItemDTO';
import { IItemRepository } from '@modules/item/repositories/IItemRepository';
import { AppError } from '@shared/error/AppError';
import { checkEachStringLength, checkIsOnlyNumbers } from '@shared/infra/utils';

@injectable()
export class CreateItem {
  constructor(
    @inject('item')
    public item: Item,
    @inject('itemRepository')
    public repository: IItemRepository,
  ) {}

  async create(data: ICreateItemDTO): Promise<Item> {
    Object.assign(this.item, {
      id: uuid(),
      ...data,
      status: STATUS_ITEM.ACTIVE,
      category_id: data.categoryId,
      created_at: new Date().toISOString(),
    });

    this.item.hash = this.hashAccessoryValue();
    this.item.gallery = this.buildGallery(data.gallery);
    this.setMeasure(data.measure);

    await this.checkIfExists();
    this.checkToCreate();

    await this.repository.save(this.item);

    return this.item;
  }

  private buildGallery(images: Array<string>): Array<Gallery> {
    const gallery = images.map((image: string) => {
      return {
        id: uuid(),
        image,
        item_id: this.item.id,
        created_at: new Date().toDateString(),
      };
    });

    return gallery;
  }

  async checkIfExists(): Promise<void> {
    await this.checkCategoryExists();
    await this.checkExistsByHash();
  }

  async checkCategoryExists(): Promise<void> {
    if (!(await this.repository.findCategoryById(this.item.category_id))) {
      throw new AppError(
        `No category was found to id ${this.item.category_id}`,
      );
    }
  }

  async checkExistsByHash(): Promise<void> {
    if (await this.repository.findByHash(this.item)) {
      throw new AppError(`The accessory value already exists`, 400);
    }
  }

  private setMeasure(measure: string): void {
    if (!MEASURE_TYPE[measure.toUpperCase()]) {
      throw new AppError(`The ${measure} is not a valid measure`, 400);
    }

    this.item.measure = measure;
  }

  private hashAccessoryValue(): string {
    const { category_id, value, measure, status, name } = this.item;
    const hash = `${category_id}${value}${measure}${status}${name}`;
    return crypto.createHash('md5').update(hash).digest('hex');
  }

  private checkToCreate(): void {
    const accessoryValueProperties = [
      {
        '4': this.item.measure,
        '150': this.item.name,
      },
    ];

    checkEachStringLength(accessoryValueProperties);
    checkIsOnlyNumbers(this.item.value);
  }
}
