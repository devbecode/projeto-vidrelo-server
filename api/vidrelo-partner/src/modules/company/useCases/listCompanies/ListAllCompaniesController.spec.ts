import request from 'supertest';
import { Connection } from 'typeorm';

import { ormCreateConnection } from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;
describe('GET /partners', () => {
  beforeAll(async () => {
    connection = await ormCreateConnection('test');
    await connection.runMigrations();
    await connection.query(
      `INSERT INTO company (id, corporate_name, status, responsible, cnpj, telephone, email, cep, state, city, district, street, number, complement, created_at)
      VALUES ('c5c11562-a68f-404f-bf03-60485361e432', 'Some Corpore', 'active', 'Some people', '84438339000164', '999999999', 'email@email.com', '315558888', 'MG', 'Some City', 'Somewhere', 'Some street', '15a', '', '2022-01-11')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Shold be able to list', async () => {
    const response = await request(app)
      .get('/v1/partners')
      .set('Conten-type', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA2OTY2OTYsInN1YiI6IjEiLCJqdGkiOiJ1dWlkUmFuZG9uIn0.KTzFAIiCFhqiNz1hXOWQBQGbkwCIu4QpI6U5t-gDD-U',
      )
      .send();

    const { companies } = response.body;
    expect(companies.length).toEqual(1);
  });

  it('Token can not be empty', async () => {
    const response = await request(app)
      .get('/v1/partners')
      .set('Conten-type', 'application/json')
      .send();

    expect(response.body).toEqual({ message: 'Token can not be empty' });
  });
});
