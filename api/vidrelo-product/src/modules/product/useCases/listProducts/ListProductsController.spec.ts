import request from 'supertest';
import { Connection } from 'typeorm';

import { ormCreateConnection } from '@shared/infra/database';
import { app } from '@shared/infra/http/app';

let connection: Connection;
describe('GET /products', () => {
  beforeAll(async () => {
    connection = await ormCreateConnection('test');
    await connection.query(
      `INSERT INTO product (id, name, full_description, short_description, status,  cover, public, created_at) VALUES ('9fe30a3b-96b6-4b17-892a-d30ed959f9c0', 'Something', 'Same Description', 'Same', 'active', 'Azure Same Link', false,'2022-31-01')`,
    );
    await connection.query(
      `INSERT INTO product (id, name, full_description, short_description, status,  cover, public, created_at) VALUES ('9fe30a3b-96b6-4b17-892a-d30ed959f9c1', 'Something', 'Same Description', 'Same', 'active', 'Azure Same Link', true,'2022-31-01')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Shold be list all active products', async () => {
    const response = await request(app)
      .get('/v1/products')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA2OTY2OTYsInN1YiI6IjEiLCJqdGkiOiJ1dWlkUmFuZG9uIn0.KTzFAIiCFhqiNz1hXOWQBQGbkwCIu4QpI6U5t-gDD-U',
      )
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      metaData: {},
      products: [
        {
          id: '9fe30a3b-96b6-4b17-892a-d30ed959f9c0',
          name: 'Something',
          full_description: 'Same Description',
          short_description: 'Same',
          status: 'active',
          cover: 'Azure Same Link',
          public: false,
        },
        {
          id: '9fe30a3b-96b6-4b17-892a-d30ed959f9c1',
          name: 'Something',
          full_description: 'Same Description',
          short_description: 'Same',
          status: 'active',
          cover: 'Azure Same Link',
          public: true,
        },
      ],
    });
  });

  it('Invalid token', async () => {
    const response = await request(app).get('/v1/products').send();
    expect(response.body).toEqual({ message: 'Token can not be empty' });
    expect(response.status).toEqual(403);
  });

  it('Shold list all public products', async () => {
    const response = await request(app).get('/v1/public/products').send();

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      metaData: {},
      products: [
        {
          id: '9fe30a3b-96b6-4b17-892a-d30ed959f9c1',
          name: 'Something',
          full_description: 'Same Description',
          short_description: 'Same',
          status: 'active',
          cover: 'Azure Same Link',
          public: true,
        },
      ],
    });
  });

  it('Shold return specify product', async () => {
    const response = await request(app)
      .get('/v1/product/9fe30a3b-96b6-4b17-892a-d30ed959f9c0')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA2OTY2OTYsInN1YiI6IjEiLCJqdGkiOiJ1dWlkUmFuZG9uIn0.KTzFAIiCFhqiNz1hXOWQBQGbkwCIu4QpI6U5t-gDD-U',
      )
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('gallery');
  });
});
