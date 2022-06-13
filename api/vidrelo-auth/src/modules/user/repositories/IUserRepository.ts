import { User } from '../domain/User';

export interface IUserRepository {
  findByName(user: User): Promise<boolean>;
  save(user: User): Promise<void>;
  findById(user: User): Promise<boolean>;
  updatePasswordById(user: User): Promise<void>;
}
