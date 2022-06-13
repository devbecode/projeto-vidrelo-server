import { inject, injectable } from 'tsyringe';

import {
  IListCompostionsDTO,
  IResponseListAllCompositions,
} from '@modules/composition/dto/CompositionDTO';
import { ICompositionRepository } from '@modules/composition/repositories/ICompositionRepository';

@injectable()
export class ListCompositions {
  constructor(
    @inject('compositionRepository')
    private repository: ICompositionRepository,
  ) {}

  public async listAll(
    data?: IListCompostionsDTO,
  ): Promise<IResponseListAllCompositions> {
    return this.repository.findAllCompositions(data);
  }
}
