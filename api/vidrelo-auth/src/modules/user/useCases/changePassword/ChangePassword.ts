import { inject, injectable } from 'tsyringe';

import { User } from '@modules/user/domain/User';
import { IChangePassword } from '@modules/user/dtos/UserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/error/AppError';
import { UseCase } from '@shared/infra/useCases/UseCase';

@injectable()
export class ChangePassword extends UseCase {
  constructor(
    @inject('userRepository')
    private repository: IUserRepository,
    @inject('user')
    private user: User,
  ) {
    super();
  }

  public async checkIfExistsById(): Promise<void> {
    if (!(await this.repository.findById(this.user))) {
      throw new AppError(`No user was found to id ${this.user.id}`);
    }
  }

  public async handleQueue(data: IChangePassword): Promise<void> {
    this.user.id = data.id;

    await this.checkIfExistsById();

    this.user.password = data.password;
    await this.repository.updatePasswordById(this.user);
  }
}
