import { getRepository, Repository } from 'typeorm';

import { AppError } from '@shared/error/AppError';

import { STATUS_USER, User } from '../domain/User';
import { IFilterUsersDTO, IListAllUsersDTO } from '../dto/UserDTO';
import { UserEntity } from '../infra/entities/UserEntity';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = getRepository(UserEntity);
  }

  async changePasswordById(user: User): Promise<void> {
    const { affected } = await this.repository.update(
      { id: user.id, email: user.email },
      { password: user.password, first_password: user.first_password },
    );

    if (!affected) {
      throw new AppError(`No password has changed to user ${user.id}`, 500);
    }
  }

  public async inactveById(user: User): Promise<void> {
    const { affected } = await this.repository.update(
      { id: user.id },
      { status: STATUS_USER.INACTIVE },
    );

    if (!affected) {
      throw new AppError(`No product was updated to id ${user.id}`, 500);
    }
  }

  public async updateById(user: User): Promise<void> {
    const {
      name,
      password,
      telephone,
      id,
      cep,
      city,
      complement,
      district,
      state,
      street,
      number,
    } = user;
    const { affected } = await this.repository.update(
      { id },
      {
        name,
        telephone,
        cep,
        city,
        complement,
        district,
        state,
        street,
        number,
      },
    );

    if (!affected) {
      throw new AppError(`No product was updated to id ${id}`, 500);
    }
  }

  public async findByEmail(user: User): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { email: user.email },
    });

    if (!record) {
      return false;
    }

    Object.assign(user, record);
    return true;
  }

  public async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  public async findAll(metadata: IFilterUsersDTO): Promise<IListAllUsersDTO> {
    const { offset, limit, profile } = metadata;

    const skip: number = offset
      ? (metadata.offset - 1) * metadata.limit
      : undefined;

    const [users, count] = await this.repository
      .createQueryBuilder('user')
      .where('user.status = :status AND user.profile = :profile', {
        status: STATUS_USER.ACTIVE,
        profile,
      })
      .skip(skip)
      .take(metadata.limit)
      .orderBy('user.email')
      .getManyAndCount();

    const metaData = {
      total: count,
      limit,
      page: offset,
    };

    return { metaData, users };
  }

  public async findById(user: User): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { id: user.id },
    });

    if (!record) {
      return false;
    }

    Object.assign(user, { first_password: record.first_password, ...record });
    return true;
  }

  public async findByIdAndProfile(user: User): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { id: user.id, profile: user.profile },
    });

    if (!record) {
      return false;
    }

    Object.assign(user, record);
    return true;
  }
}
