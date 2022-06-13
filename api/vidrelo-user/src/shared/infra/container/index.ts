import { container } from 'tsyringe';

import { User } from '@modules/user/domain/User';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UserRepository } from '@modules/user/repositories/UserRepository';

container.registerSingleton('user', User);
container.registerSingleton<IUserRepository>('userRepository', UserRepository);
