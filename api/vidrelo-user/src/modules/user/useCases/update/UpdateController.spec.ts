import request from 'supertest';
import { Connection } from 'typeorm';

import { ormCreateConnection } from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('PATCH /user/:id', () => {
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

  it('Shold be to update user', async () => {
    const response = await request(app)
      .patch('/v1/user/22e0b23f-1eeb-47f3-96be-6a454fdf8f90')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA4NzY0NTEsInN1YiI6IjEiLCJqdGkiOiJ1dWlkUmFuZG9uIn0.pffUgeC_u5R4ynPsRMWgRYqW67oel0NTwNJEOMNtPZg',
      )
      .send({
        name: 'Someone',
        telephone: '3195525541',
        password: 'abcb',
      });

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      id: '22e0b23f-1eeb-47f3-96be-6a454fdf8f90',
      name: 'Someone',
      status: 'active',
      email: 'email@email.com',
      password: 'abcb',
      telephone: '3195525541',
      created_at: 'now()',
      profile: 'shirley',
    });
  });

  it('Token cannot be empty', async () => {
    const response = await request(app)
      .patch('/v1/user/22e0b23f-1eeb-47f3-96be-6a454fdf8f90')
      .send();

    expect(response.status).toEqual(403);
    expect(response.body).toEqual({ message: 'Token can not be empty' });
  });
});
