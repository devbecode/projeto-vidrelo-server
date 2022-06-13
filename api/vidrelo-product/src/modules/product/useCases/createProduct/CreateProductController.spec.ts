import request from 'supertest';
import { Connection } from 'typeorm';

import { Product } from '@modules/product/domain/Product';
import { ormCreateConnection } from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('POST /product', () => {
  beforeAll(async () => {
    connection = await ormCreateConnection('test');
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Shold be possible create new product', async () => {
    const product: Product = {
      id: '49ff1c6e-d265-49b1-babd-31acc141b6bd',
      status: 'active',
      name: 'Integration teste',
      full_description: 'Integration teste',
      short_description: 'Litle description',
      cover: 'Azure Storage url link',
      installation: '2.50',
      created_at: '2021-02-19',
      public: false,
    };

    const response = await request(app)
      .post('/v1/product')
      .set('Content-type', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA2OTY2OTYsInN1YiI6IjEiLCJqdGkiOiJ1dWlkUmFuZG9uIn0.KTzFAIiCFhqiNz1hXOWQBQGbkwCIu4QpI6U5t-gDD-U',
      )
      .send({
        name: product.name,
        full_description: product.full_description,
        short_description: product.short_description,
        cover: product.cover,
        installation: product.installation,
        public: false,
      });

    expect(response.body).toMatchObject({
      status: 'active',
      name: 'Integration teste',
      full_description: 'Integration teste',
      short_description: 'Litle description',
      public: false,
      cover: 'Azure Storage url link',
    });
  });
});
