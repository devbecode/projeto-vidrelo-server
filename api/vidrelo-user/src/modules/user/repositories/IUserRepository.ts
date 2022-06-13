import { User } from '../domain/User';
import { IFilterUsersDTO, IListAllUsersDTO } from '../dto/UserDTO';

export interface IUserRepository {
  findByEmail(user: User): Promise<boolean>;
  save(user: User): Promise<void>;
  findAll(metadata: IFilterUsersDTO): Promise<IListAllUsersDTO>;
  findById(user: User): Promise<boolean>;
  findByIdAndProfile(user: User): Promise<boolean>;
  updateById(user: User): Promise<void>;
  inactveById(user: User): Promise<void>;
  changePasswordById(user: User): Promise<void>;
}
