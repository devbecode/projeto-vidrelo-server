import moment from 'moment';
import request from 'supertest';
import { Connection } from 'typeorm';

import { Company } from '@modules/company/domain/Company';
import { ormCreateConnection } from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('POST /company', () => {
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

  it('Invalid token', async () => {
    const response = await request(app)
      .post('/v1/partner')
      .set('Conten-type', 'application/json');

    expect(response.body).toMatchObject({ message: 'Token can not be empty' });
  });

  it('Shold be able to create a new company', async () => {
    const company: Company = {
      id: 'c5c11562-a68f-404f-bf03-60485361e432',
      corporate_name: 'Some Company',
      status: 'active',
      responsible: 'Some people',
      cnpj: '87017979000199',
      telephone: '999999999',
      email: 'email@email.com',
      cep: '31555888',
      state: 'MG',
      city: 'Some City',
      district: 'Somewhere',
      street: 'Some street',
      number: '15',
      complement: '',
      created_at: '2022-01-11',
    };

    const response = await request(app)
      .post('/v1/partner')
      .set('Conten-type', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA2OTY2OTYsInN1YiI6IjEiLCJqdGkiOiJ1dWlkUmFuZG9uIn0.KTzFAIiCFhqiNz1hXOWQBQGbkwCIu4QpI6U5t-gDD-U',
      )
      .send(company);

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      corporate_name: 'Some Company',
      status: 'active',
      responsible: 'Some people',
      cnpj: '87017979000199',
      telephone: '999999999',
      email: 'email@email.com',
      cep: '31555888',
      state: 'MG',
      city: 'Some City',
      district: 'Somewhere',
      street: 'Some street',
      number: '15',
      complement: '',
    });
  });

  it('Shold throw exception already exists', async () => {
    const company: Company = {
      id: 'c5c11562-a68f-404f-bf03-60485361e432',
      corporate_name: 'Some Company',
      status: 'active',
      responsible: 'Some people',
      cnpj: '87017979000199',
      telephone: '999999999',
      email: 'email@email.com',
      cep: '31555888',
      state: 'MG',
      city: 'Some City',
      district: 'Somewhere',
      street: 'Some street',
      number: '15',
      complement: '',
      created_at: '2022-01-11',
    };

    const response = await request(app)
      .post('/v1/partner')
      .set('Conten-type', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA2OTY2OTYsInN1YiI6IjEiLCJqdGkiOiJ1dWlkUmFuZG9uIn0.KTzFAIiCFhqiNz1hXOWQBQGbkwCIu4QpI6U5t-gDD-U',
      )
      .send(company);

    expect(response.status).toEqual(400);
    expect(response.body).toMatchObject({
      message: 'Company 87017979000199 already exists',
    });
  });
});
