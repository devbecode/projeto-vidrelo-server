import moment from 'moment';
import { inject, injectable } from 'tsyringe';

import { Item } from '@modules/item/domain/Item';
import {
  IFilterListItensDTO,
  IResponseListAllItensDTO,
} from '@modules/item/dto/ItemDTO';
import { IItemRepository } from '@modules/item/repositories/IItemRepository';
import { AppError } from '@shared/error/AppError';

@injectable()
export class ListItens {
  constructor(
    @inject('itemRepository')
    private repository: IItemRepository,
    @inject('item')
    private item: Item,
  ) {}

  async listAll(data?: IFilterListItensDTO): Promise<IResponseListAllItensDTO> {
    const listItens = await this.repository.findAll(data);
    listItens.itens = listItens.itens.map(item => ({
      ...item,
      created_at: moment(item.created_at, 'YYYY-mm-dd').format(
        'YYYY-MM-DD HH:mm:ss',
      ),
    }));

    return listItens;
  }

  public async findDetailsById(id: string): Promise<Item> {
    this.item.id = id;
    await this.checkIfExists();

    await this.repository.loadGalleryByItemId(this.item);
    return this.item;
  }

  private async checkIfExists(): Promise<void> {
    if (!this.repository.findById(this.item)) {
      throw new AppError(`No item was found to id ${this.item.id}`);
    }
  }
}
