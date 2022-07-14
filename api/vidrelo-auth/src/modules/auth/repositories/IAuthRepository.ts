import { User } from '../../user/domain/User';

export interface IAuthRepository {
  findByEmail(user: User): Promise<void>;
  findTokenByUserId(user: User): Promise<boolean>;
  save(user: User): Promise<void>;
}
