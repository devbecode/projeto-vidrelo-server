import { User } from '../../user/domain/User';
import { IAuthRepository } from './IAuthRepository';

export class AuthRepositoryMemory implements IAuthRepository {
  async findByUsername(user: User): Promise<void> {
    if (user.name === 'admin') {
      Object.assign(user, {
        password:
          '$2a$12$Opwkh0qgj75Zas4rYjf3se0VBNUrtOaTO1O6prXKDFeeMPfDE0VJ2',
      });
    }
  }

  async findTokenByUserId(user: User): Promise<boolean> {
    if (user.id === 'aecdbc53-183f-4ca3-bfd0-f9aa21dc5205') {
      Object.assign(user, {
        auth: {
          id: '7778f96e-a930-41af-91b4-3bd891e0bdc0',
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          expires_in: '2400',
          created_at: '2019-12-23',
          user_id: 'aecdbc53-183f-4ca3-bfd0-f9aa21dc5205',
        },
      });

      return true;
    }

    return false;
  }

  async save(user: User): Promise<void> {}
}
