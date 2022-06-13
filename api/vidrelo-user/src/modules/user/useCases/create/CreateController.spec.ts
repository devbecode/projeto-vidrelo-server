import request from 'supertest';
import { Connection } from 'typeorm';

import { ormCreateConnection } from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('POST /user', () => {
  beforeAll(async () => {
    connection = await ormCreateConnection('test');
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Shold be able to create a new user', async () => {
    const user = {
      name: 'Someone',
      password: 'password',
      telephone: '31999999999',
      email: 'email@email.com',
    };

    const response = await request(app)
      .post('/v1/user')
      .set('Content-type', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA4NzY0NTEsInN1YiI6IjEiLCJqdGkiOiJ1dWlkUmFuZG9uIn0.pffUgeC_u5R4ynPsRMWgRYqW67oel0NTwNJEOMNtPZg',
      )
      .send(user);

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      name: 'Someone',
      password: 'password',
      telephone: '31999999999',
      email: 'email@email.com',
    });
  });

  it('Token cannot be empty', async () => {
    const user = {
      name: 'Someone',
      password: 'password',
      telephone: '31999999999',
      email: 'email@email.com',
    };

    const response = await request(app)
      .post('/v1/user')
      .set('Content-type', 'application/json')
      .send(user);

    expect(response.status).toEqual(403);
    expect(response.body).toEqual({ message: 'Token can not be empty' });
  });

  it('User already exists', async () => {
    const user = {
      name: 'Someone',
      password: 'password',
      telephone: '31999999999',
      email: 'email@email.com',
    };

    const response = await request(app)
      .post('/v1/user')
      .set('Content-type', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA4NzY0NTEsInN1YiI6IjEiLCJqdGkiOiJ1dWlkUmFuZG9uIn0.pffUgeC_u5R4ynPsRMWgRYqW67oel0NTwNJEOMNtPZg',
      )
      .send(user);

    expect(response.status).toEqual(500);
    expect(response.body).toEqual({
      message: 'The user with email email@email.com already exists',
    });
  });
});
