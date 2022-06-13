import { Auth } from '@modules/auth/domain/Auth';
import { AuthRepositoryMemory } from '@modules/auth/repositories/AuthRepositoryMemory';
import { User } from '@modules/user/domain/User';

import { AuthenticateUseCase } from './AuthenticateUseCase';

describe('Authenticate user', () => {
  it('Shold be able to authenticate', async () => {
    process.env.SECRET_KEY = 'teste';

    const user: User = new User();
    Object.assign(user, {
      id: 'aecdbc53-183f-4ca3-bfd0-f9aa21dc5205',
      status: 'active',
      name: 'admin',
      password: 'admin',
      created_at: '2021-12-23',
    });

    const auth: Auth = new Auth();

    const entityMemory = new AuthRepositoryMemory();
    const authenticateUseCase = new AuthenticateUseCase(
      entityMemory,
      user,
      auth,
    );

    const authenticated = await authenticateUseCase.authenticate({
      username: user.name,
      password: user.password,
    });

    expect(authenticated).toHaveProperty(['accessToken']);
  });
});
