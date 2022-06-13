import { inject, injectable } from 'tsyringe';

import { Auth } from '@modules/auth/domain/Auth';
import { AuthRepository } from '@modules/auth/repositories/AuthRepository';
import { AuthenticateUseCase } from '@modules/auth/useCase/authenticate/AuthenticateUseCase';
import { User } from '@modules/user/domain/User';
import { ICreateUserDTO } from '@modules/user/dtos/UserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/error/AppError';
import { UseCase } from '@shared/infra/useCases/UseCase';

@injectable()
export class CreateUseCase extends UseCase {
  constructor(
    @inject('userRepository')
    private repository: IUserRepository,
    @inject('user')
    private user: User,
  ) {
    super();
  }

  public async handleQueue(data: ICreateUserDTO): Promise<void> {
    Object.assign(this.user, data);
    await this.checkIfExists();

    await this.generateToken();
    await this.repository.save(this.user);
  }

  private async generateToken(): Promise<void> {
    const auth = new AuthenticateUseCase(
      new AuthRepository(),
      this.user,
      new Auth(),
    );

    await auth.verifyToken();
  }

  private async checkIfExists(): Promise<void> {
    if (await this.repository.findByName(this.user)) {
      throw new AppError(`User already exists`);
    }
  }
}
