import { UserRepositoryMemory } from '@modules/user/repositories/UserRepositoryMemory';

describe('List Use Case', () => {
  const repositoryMemory = new UserRepositoryMemory();

  it('Must list all users', async () => {
    const users = await repositoryMemory.findAll({});

    expect(users.metaData).toMatchObject({ total: 1, limit: 1, page: 1 });
    expect(users.users).toHaveLength(1);
  });
});
