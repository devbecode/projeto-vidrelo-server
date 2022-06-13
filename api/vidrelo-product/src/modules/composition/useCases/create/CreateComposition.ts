import crypto from 'crypto';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { Composition } from '@modules/composition/domain/Composition';
import { ICreateCompositionDTO } from '@modules/composition/dto/CompositionDTO';
import { ICompositionRepository } from '@modules/composition/repositories/ICompositionRepository';
import { AppError } from '@shared/error/AppError';

@injectable()
export class CreateComposition {
  constructor(
    @inject('composition')
    private composition: Composition,
    @inject('compositionRepository')
    private repository: ICompositionRepository,
  ) {}

  public async create(data: ICreateCompositionDTO): Promise<Composition> {
    Object.assign(this.composition, {
      id: uuid(),
      ...data,
    });

    this.composition.status = 'active';
    // this.composition.hash = this.hashAccessoryValue();
    await this.checkIfExists();

    await this.repository.save(this.composition, data.itens_id);
    return this.composition;
  }

  // private hashAccessoryValue(): string {
  //   const { item_id, product_id, category_id, status } = this.composition;
  //   const hash = `${item_id}${product_id}${category_id}${status}${uuid()}`;
  //   return crypto.createHash('md5').update(hash).digest('hex');
  // }

  private async checkIfExists(): Promise<void> {
    // if (await this.repository.findByHash(this.composition)) {
    //   throw new AppError(`Compostion already exists`, 400);
    // }

    if (!(await this.repository.findItensById(this.composition))) {
      throw new AppError(
        `No item was found to id ${this.composition.item_id}`,
        400,
      );
    }

    if (!(await this.repository.findProductById(this.composition))) {
      throw new AppError(
        `No product was found to id ${this.composition.product_id}`,
        400,
      );
    }
  }
}
