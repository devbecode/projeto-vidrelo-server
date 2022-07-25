import { inject, injectable } from 'tsyringe';

import { User } from '@modules/user/domain/User';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/error/AppError';

@injectable()
export class UpdateUseCase {
  constructor(
    @inject('userRepository')
    private repository: IUserRepository,
    @inject('user')
    private user: User,
  ) {}

  private async findById(): Promise<boolean> {
    return this.repository.findById(this.user);
  }

  private async checkIfExists(): Promise<void> {
    if (!(await this.findById())) {
      throw new AppError(`No user was found to id ${this.user.id}`);
    }
  }

  public async inactve(id: string): Promise<void> {
    this.user.id = id;
    await this.checkIfExists();

    await this.repository.inactiveById(this.user.id);
  }
  public async updatePasswordById(id: string, password: string): Promise<void> {
    this.user.id = id;
    this.user.password = password;
    await this.checkIfExists();

    await this.repository.updatePasswordById(this.user);
  }
}
