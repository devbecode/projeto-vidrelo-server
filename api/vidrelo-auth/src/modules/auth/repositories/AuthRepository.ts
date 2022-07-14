import { getRepository, Repository } from 'typeorm';

import { AppError } from '../../../shared/error/AppError';
import { User, USER_STATUS } from '../../user/domain/User';
import { UserEntity } from '../../user/infra/entities/UserEntity';
import { AuthEntity } from '../infra/entities/AuthEntity';
import { IAuthRepository } from './IAuthRepository';

export class AuthRepository implements IAuthRepository {
  private repository: Repository<AuthEntity>;

  constructor() {
    this.repository = getRepository(AuthEntity);
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user.auth);
  }

  async findTokenByUserId(user: User): Promise<boolean> {
    const record = await this.repository.findOne({
      where: { user_id: user.id },
      order: { created_at: 'DESC' },
    });

    if (!record) {
      return false;
    }

    const { id, access_token, expires_in, created_at, user_id } = record;
    Object.assign(user, {
      auth: {
        id,
        access_token,
        expires_in,
        created_at,
        user_id,
      },
    });

    return true;

    // throw new AppError(
    //   `Unable to login with this user, please contact our support`,
    //   500,
    // );
  }

  async findByEmail(user: User): Promise<void> {
    const record = await getRepository(UserEntity).findOne({
      where: { email: user.email, status: USER_STATUS.ACTIVE },
    });

    if (!record) {
      throw new AppError(`No user was found to email ${user.email}`);
    }

    Object.assign(user, record);
  }
}
