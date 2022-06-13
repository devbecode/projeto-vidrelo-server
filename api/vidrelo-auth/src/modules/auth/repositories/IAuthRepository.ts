import { User } from '../../user/domain/User';

export interface IAuthRepository {
  findByUsername(user: User): Promise<void>;
  findTokenByUserId(user: User): Promise<boolean>;
  save(user: User): Promise<void>;
}
