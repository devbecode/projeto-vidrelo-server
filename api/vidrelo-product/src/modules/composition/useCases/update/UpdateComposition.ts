import { inject, injectable } from 'tsyringe';

import { Composition } from '@modules/composition/domain/Composition';
import { ICompositionRepository } from '@modules/composition/repositories/ICompositionRepository';
import { AppError } from '@shared/error/AppError';

@injectable()
export class UpdateComposition {
  constructor(
    @inject('composition')
    private composition: Composition,
    @inject('compositionRepository')
    private repository: ICompositionRepository,
  ) {}

  public async inactivate(id: string): Promise<void> {
    this.composition.id = id;
    await this.checkIfExists();

    await this.repository.inactivate(this.composition);
  }

  private async checkIfExists(): Promise<void> {
    if (!(await this.repository.findById(this.composition))) {
      throw new AppError(
        `No composition was found to id ${this.composition.id}`,
        400,
      );
    }
  }
}
