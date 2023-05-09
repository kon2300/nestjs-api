import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { AuthLoginRequest } from '@/adaptor/primary/api/auth/requests/login.request';
import { AuthLoginResponse } from '@/adaptor/primary/api/auth/responses/login.response';
import { createTestResponse } from '@test/common/create.test.response';

describe('【e2eテスト】/auth/login', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const authLoginRequest: AuthLoginRequest = {
    username: 'john',
    password: 'changeme',
  };

  const authLoginResponse: AuthLoginResponse = createTestResponse(
    HttpStatus.OK,
    {
      accessToken: expect.anything(),
      user: {
        username: 'john',
      },
    },
  );

  describe('正常系', () => {
    it('登録されたユーザがログインできること', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send(authLoginRequest);

      expect(res.body).toEqual(authLoginResponse);
    });
  });
});
