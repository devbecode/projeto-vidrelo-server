import { container } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UserRepository } from '@modules/user/repositories/UserRepository';

import { Auth } from '../../../modules/auth/domain/Auth';
import { AuthRepository } from '../../../modules/auth/repositories/AuthRepository';
import { IAuthRepository } from '../../../modules/auth/repositories/IAuthRepository';
import { User } from '../../../modules/user/domain/User';

container.registerSingleton<IAuthRepository>('authRepository', AuthRepository);
container.registerSingleton<User>('user', User);
container.registerSingleton<Auth>('auth', Auth);
container.registerSingleton<IUserRepository>('userRepository', UserRepository);
