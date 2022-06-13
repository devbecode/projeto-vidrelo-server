import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import { GalleryEntity } from '@modules/gallery/entities/GalleryEntity';
import { ItemEntity } from '@modules/item/infra/entities/ItemEntity';
import { ProductEntity } from '@modules/product/infra/entities/ProductEntity';
import { AppError } from '@shared/error/AppError';

import { Composition } from '../domain/Composition';
import {
  IListCompostionsDTO,
  IResponseListAllCompositions,
} from '../dto/CompositionDTO';
import { CompositionEntity } from '../infra/entities/CompositionEntity';
import { ICompositionRepository } from './ICompositionRepository';

export class CompositionRepository implements ICompositionRepository {
  private repository: Repository<CompositionEntity>;

  constructor() {
    this.repository = getRepository(CompositionEntity);
  }

  async inactivate(composition: Composition): Promise<void> {
    const { affected } = await this.repository.update(
      { id: composition.id },
      { status: 'inactive' },
    );

    if (!affected) {
      throw new AppError(
        `No item value was updated to id ${composition.id}`,
        500,
      );
    }
  }

  async findById(composition: Composition): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { id: composition.id },
    });

    return !!record;
  }

  async findAllCompositions(
    pagination: IListCompostionsDTO,
  ): Promise<IResponseListAllCompositions> {
    const { offset, limit } = pagination;

    const skip: number = offset
      ? (pagination.offset - 1) * pagination.limit
      : undefined;

    const [compositions, count] = await this.repository
      .createQueryBuilder('composition')
      .where(
        'composition.status = :status AND composition.product_id = :product_id',
        {
          status: 'active',
          product_id: pagination.productId,
        },
      )
      .skip(skip)
      .take(pagination.limit)
      .orderBy('composition.id')
      .getManyAndCount();

    const metaData = {
      total: count,
      limit,
      page: offset,
    };

    const allCompositions = await this.findDetails(compositions);
    return { compositions: allCompositions, metaData };
  }

  private async findDetails(
    testes: Array<CompositionEntity>,
  ): Promise<Array<CompositionEntity>> {
    let allItens;

    // eslint-disable-next-line no-restricted-syntax
    for await (const item of testes) {
      console.log(item.item_id);
      const records = await getRepository(ItemEntity)
        .createQueryBuilder('item')
        .where('item.status = :status AND item.id = :id', {
          status: 'active',
          id: item.item_id,
        })
        .innerJoin('gallery', 'g', 'g.item_id = item.id')
        .getMany();

      item.itens = records;
      const manyItens = item.itens;

      // eslint-disable-next-line no-restricted-syntax
      for await (const each of manyItens) {
        each.gallerys = await getRepository(GalleryEntity)
          .createQueryBuilder('gallery')
          .where('gallery.item_id = :itemId', { itemId: each.id })
          .getMany();

        allItens = manyItens;
      }

      item.itens = allItens;
    }

    return testes;
  }

  public async findItensById(composition: Composition): Promise<boolean> {
    composition.itens_id.forEach(async id => {
      const record = await getRepository(ItemEntity).findOne({
        where: { id },
      });

      if (!record) {
        throw new AppError(`No item was found to id ${id}`);
      }
    });

    return true;
  }

  public async findProductById(composition: Composition): Promise<boolean> {
    const record = await getRepository(ProductEntity).findOne({
      where: { id: composition.product_id },
    });

    return !!record;
  }

  public async findByHash(composition: Composition): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { hash: composition.hash },
    });

    if (!record) {
      return false;
    }

    return true;
  }

  public async save(
    composition: Composition,
    ids: Array<string>,
  ): Promise<void> {
    ids.map(async item => {
      await this.repository.save({
        item_id: item,
        hash: v4(),
        ...composition,
        id: v4(),
      });
    });
  }
}
