import { getRepository, Repository } from 'typeorm';

import { BudgetEntity } from '../entities/BudgetEntity';
import { IBudgetRepository } from './IBudgetRepository';

export class BudgetRepository implements IBudgetRepository {
  private repository: Repository<BudgetEntity>;
  constructor() {
    this.repository = getRepository(BudgetEntity);
  }

  save() {
    throw new Error('Method not implemented.');
  }
}
