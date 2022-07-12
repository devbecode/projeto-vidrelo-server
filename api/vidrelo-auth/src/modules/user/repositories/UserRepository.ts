import { getRepository, Repository } from 'typeorm';

import { AppError } from '@shared/error/AppError';

import { User } from '../domain/User';
import { UserEntity } from '../infra/entities/UserEntity';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = getRepository(UserEntity);
  }

  public async updatePasswordById(user: User): Promise<void> {
    const { password, id } = user;
    const { affected } = await this.repository.update({ id }, { password });

    if (!affected) {
      throw new AppError(`No user was updated to id ${id}`, 500);
    }
  }

  public async findById(user: User): Promise<boolean> {
    const record = await this.repository.findOne({ where: { id: user.id } });
    return !!record;
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findByEmail(user: User): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { email: user.email },
    });

    if (!record) {
      return false;
    }

    return true;
  }
}
