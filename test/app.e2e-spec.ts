import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer()).get('/user').expect(200);
  });

  it('creates a user', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'example_user',
        email: 'user@example.com',
      })
      .expect(201)
      .expect((res) => {
        const { id, name, email } = res.body;
        expect(id).toBeDefined();
        expect(name).toBe('example_user');
        expect(email).toBe('user@example.com');
      });
  });
});
