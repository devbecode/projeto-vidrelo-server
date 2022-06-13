import { User, USER_PROFILE } from '@modules/user/domain/User';
import { ICreateUserDTO } from '@modules/user/dto/UserDTO';
import { UserRepositoryMemory } from '@modules/user/repositories/UserRepositoryMemory';

import { CreateUseCase } from './CreateUseCase';

describe('Create use', () => {
  const repositoryMemory = new UserRepositoryMemory();

  test('Shold be able to create a new user', async () => {
    const user = new User();
    const newUser: ICreateUserDTO = {
      name: 'Someone',
      email: 'email1@email.com',
      telephone: '31944445525',
      profile: USER_PROFILE.EMPLOYEE,
    };

    const createUseCase = new CreateUseCase(repositoryMemory, user);

    await createUseCase.create(newUser);
    expect(await createUseCase.create(newUser)).toHaveProperty(['id']);
  });

  test('User with email already exists', async () => {
    const user = new User();
    const newUser: ICreateUserDTO = {
      name: 'Someone',
      email: 'email2@email.com',
      telephone: '31944445525',
      profile: USER_PROFILE.EMPLOYEE,
    };

    const createUseCase = new CreateUseCase(repositoryMemory, user);

    await expect(createUseCase.create(newUser)).rejects.toEqual({
      message: `The user with email ${newUser.email} already exists`,
      statusCode: 500,
    });
  });

  test('Invalid telephone', async () => {
    const user = new User();
    const newUser: ICreateUserDTO = {
      name: 'Someone',
      email: 'email3@email.com',
      telephone: 'a31944445525',
      profile: USER_PROFILE.EMPLOYEE,
    };

    const createUseCase = new CreateUseCase(repositoryMemory, user);

    await expect(createUseCase.create(newUser)).rejects.toEqual({
      message: `The telephone a31944445525 must be only numbers`,
      statusCode: 400,
    });
  });
});
