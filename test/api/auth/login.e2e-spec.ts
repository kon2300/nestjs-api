import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { AuthLoginRequest } from '@/adaptor/primary/api/auth/requests/auth.login.request.dto';
import { AuthLoginResponse } from '@/adaptor/primary/api/auth/responses/auth.login.response.dto';
import { createTestResponse } from '@test/common/create.test.response';
import { prisma } from '@test/common/prisma.client';
import { User } from '@/domain/user/user';

describe('【e2eテスト】/auth/login', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const user = new User(authLoginRequest);
    const newUser = user.create();
    await prisma.pUser.create({ data: newUser });
  });

  afterAll(async () => {
    await prisma.pUser.deleteMany();
  });

  const authLoginRequest: AuthLoginRequest = {
    email: 'test@test.com',
    password: 'testPassword',
  };

  const authLoginResponse: AuthLoginResponse = createTestResponse(
    HttpStatus.OK,
    {
      accessToken: expect.anything(),
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
