import { User } from '../domain/User';

export interface IUserRepository {
  findByEmail(user: User): Promise<boolean>;
  save(user: User): Promise<void>;
  findById(user: User): Promise<boolean>;
  inactiveById(id: string): Promise<void>;
  updatePasswordById(user: User): Promise<void>;
}
