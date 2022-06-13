import { User } from '../domain/User';
import { IFilterUsersDTO, IListAllUsersDTO } from '../dto/UserDTO';
import { IUserRepository } from './IUserRepository';

export class UserRepositoryMemory implements IUserRepository {
  async changePasswordById(user: User): Promise<void> {
    console.log(user);
  }

  async findByIdAndProfile(user: User): Promise<boolean> {
    return true;
  }

  async findByEmail(user: User): Promise<boolean> {
    if (user.email === 'email2@email.com') {
      return true;
    }

    return false;
  }

  async save(user: User): Promise<void> {}

  async findAll(metadata: IFilterUsersDTO): Promise<IListAllUsersDTO> {
    const metaData = { total: 1, limit: 1, page: 1 };
    return {
      metaData,
      users: [
        {
          id: '7c39a93a-bff4-4e2c-bcf0-4c6e924ecf35',
          name: 'Someone',
          email: 'email@email.com',
          password: 'SOMENTHING',
          status: 'active',
          telephone: '31994525585',
          created_at: '2022-01-19',
          profile: 'employee',
          salt: 'some',
          first_password: true,
        },
      ],
    };
  }

  findById(user: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  updateById(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  inactveById(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
