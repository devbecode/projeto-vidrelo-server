import { Composition } from '../domain/Composition';
import {
  IListCompostionsDTO,
  IResponseListAllCompositions,
} from '../dto/CompositionDTO';

export interface ICompositionRepository {
  save(composition: Composition, ids: Array<string>): Promise<void>;
  findByHash(composition: Composition): Promise<boolean>;
  findItensById(composition: Composition): Promise<boolean>;
  findProductById(composition: Composition): Promise<boolean>;
  findAllCompositions(
    pagination?: IListCompostionsDTO,
  ): Promise<IResponseListAllCompositions>;
  findById(composition: Composition): Promise<boolean>;
  inactivate(composition: Composition): Promise<void>;
}
