import { inject, injectable } from 'tsyringe';

import { User } from '@modules/user/domain/User';
import { IFilterUsersDTO, IListAllUsersDTO } from '@modules/user/dto/UserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/error/AppError';
import { formatDate } from '@shared/utils';

@injectable()
export class ListUseCase {
  constructor(
    @inject('userRepository')
    private repository: IUserRepository,
    @inject('user')
    private user: User,
  ) {}

  public async listAll(metadata: IFilterUsersDTO): Promise<IListAllUsersDTO> {
    const listCompanies = await this.repository.findAll(metadata);
    listCompanies.users = listCompanies.users.map(user => ({
      ...user,
      created_at: formatDate(new Date().toISOString()),
    }));

    return listCompanies;
  }

  public async findById(id: string): Promise<User> {
    this.user.id = id;
    await this.checkIfExists();

    return this.user;
  }

  private async checkIfExists(): Promise<void> {
    if (!(await this.repository.findById(this.user))) {
      throw new AppError(`No user was found to id ${this.user.id}`);
    }
  }
}
