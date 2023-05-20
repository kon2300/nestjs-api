import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/appModule';
import { AuthLoginRequest } from '@/adaptor/primary/api/auth/requests/authLoginRequestDto';
import { AuthLoginResponse } from '@/adaptor/primary/api/auth/responses/authLoginResponseDto';
import { createTestResponse } from '@test/common/createTestResponse';
import { prisma } from '@test/common/prismaClient';
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
    user.create();
    await prisma.pUser.create({ data: user });
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
