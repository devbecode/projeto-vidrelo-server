import request from 'supertest';
import { Connection } from 'typeorm';

import { ormCreateConnection } from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('GET /users', () => {
  beforeAll(async () => {
    connection = await ormCreateConnection('test');
    await connection.runMigrations();
    await connection.query(
      `INSERT INTO user (id, status, name, email, password, telephone, created_at) VALUES ('22e0b23f-1eeb-47f3-96be-6a454fdf8f90', 'active', 'Somenthing', 'email@email.com', 'password', 'telephone', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Shold list all users', async () => {
    const response = await request(app)
      .get('/v1/users')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA4NzY0NTEsInN1YiI6IjEiLCJqdGkiOiJ1dWlkUmFuZG9uIn0.pffUgeC_u5R4ynPsRMWgRYqW67oel0NTwNJEOMNtPZg',
      )
      .query({
        offset: '1',
        limit: '2',
      })
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      metaData: { total: 1, limit: '2', page: '1' },
      users: [
        {
          id: '22e0b23f-1eeb-47f3-96be-6a454fdf8f90',
          name: 'Somenthing',
          status: 'active',
          email: 'email@email.com',
          password: 'password',
          telephone: 'telephone',
        },
      ],
    });
  });

  it('Token cannot be empty', async () => {
    const response = await request(app).get('/v1/users').send();

    expect(response.status).toEqual(403);
    expect(response.body).toEqual({ message: 'Token can not be empty' });
  });
});
