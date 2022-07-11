import { inject, injectable } from 'tsyringe';
import { hashSync } from 'bcrypt';
import { Auth } from '@modules/auth/domain/Auth';
import { AuthRepository } from '@modules/auth/repositories/AuthRepository';
import { AuthenticateUseCase } from '@modules/auth/useCase/authenticate/AuthenticateUseCase';
import { User } from '@modules/user/domain/User';
import { ICreateUserDTO } from '@modules/user/dtos/UserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/error/AppError';
import { UseCase } from '@shared/infra/useCases/UseCase';
import { v4 as uuid } from 'uuid';
import { formatDate } from '@shared/utils/utils';
import { USER_STATUS } from '@modules/user/domain/User';

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

  public async create(newUser: ICreateUserDTO): Promise<User> {
    await this.checkIfExists();

    Object.assign(this.user, {
      id: uuid(),
      status: USER_STATUS.ACTIVE,
      name: newUser.name,
      password: newUser.password,
      created_at: formatDate(new Date().toISOString()),
    });

    this.encryptPassword();

    try {
      await this.repository.save(this.user);
    } catch (e) {
      console.log(e);
    }
    return this.user;
  }

  private encryptPassword(): void {
    if (!this.user.password) {
      throw new AppError(`The password can not be empty`, 400);
    }

    this.user.password = hashSync(this.user.password, 12);
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
