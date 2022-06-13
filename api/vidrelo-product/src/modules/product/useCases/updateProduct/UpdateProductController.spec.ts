import request from 'supertest';
import { Connection } from 'typeorm';

import { Product } from '@modules/product/domain/Product';
import { ormCreateConnection } from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;
describe('PATCH /product/:id', () => {
  beforeAll(async () => {
    connection = await ormCreateConnection('test');
    await connection.runMigrations();
    await connection.query(
      `INSERT INTO product (id, name, full_description, short_description, status,  cover, public, created_at) VALUES ('9fe30a3b-96b6-4b17-892a-d30ed959f9c0', 'Something', 'Same Description', 'Same', 'active', 'Azure Same Link', false,'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Shold be able to update product', async () => {
    const product: Product = new Product();

    Object.assign(product, {
      id: '9fe30a3b-96b6-4b17-892a-d30ed959f9c0',
      name: 'Product Name',
      cover: 'Azure Link',
      full_description: 'Product description',
      public: false,
    });

    const response = await request(app)
      .patch(`/v1/product/${product.id}`)
      .set('Conten-type', 'application/json')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA2OTY2OTYsInN1YiI6IjEiLCJqdGkiOiJ1dWlkUmFuZG9uIn0.KTzFAIiCFhqiNz1hXOWQBQGbkwCIu4QpI6U5t-gDD-U',
      )
      .send({
        name: product.name,
        full_description: product.full_description,
        short_description: product.short_description,
        is_public: false,
        cover: product.cover,
      });

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      cover: 'Azure Same Link',
      created_at: null,
      full_description: 'Product description',
      id: '9fe30a3b-96b6-4b17-892a-d30ed959f9c0',
      name: 'Product Name',
      status: 'active',
    });
  });
});
