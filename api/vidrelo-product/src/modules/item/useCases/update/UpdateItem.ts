import { inject, injectable } from 'tsyringe';

import { Item } from '@modules/item/domain/Item';
import { IItemRepository } from '@modules/item/repositories/IItemRepository';
import { AppError } from '@shared/error/AppError';

@injectable()
export class UpdateItem {
  constructor(
    @inject('itemRepository')
    private repository: IItemRepository,
    @inject('item')
    private item: Item,
  ) {}

  async inactive(id: string): Promise<void> {
    Object.assign(this.item, { id });
    await this.checkIfExists();
    await this.inactiveById();
  }

  private async inactiveById(): Promise<void> {
    await this.repository.inactiveById(this.item);
  }

  private async checkIfExists(): Promise<void> {
    if (!(await this.repository.findById(this.item))) {
      throw new AppError(`No item was found to id ${this.item.id}`, 400);
    }
  }
}
