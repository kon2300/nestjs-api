import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/appModule';
import { createTestResponse } from '@test/common/createTestResponse';
import { UserCreateRequest } from '@/adaptor/primary/api/user/requests/userCreateRequestDto';
import { prisma } from '@test/common/prismaClient';

describe('【e2eテスト】/user/create', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await prisma.pUser.deleteMany();
  });

  const userCreateRequest: UserCreateRequest = {
    email: 'test@test.com',
    password: 'testPassword',
  };

  const createResponse = createTestResponse(HttpStatus.CREATED);

  describe('正常系', () => {
    it('ユーザが登録できること', async () => {
      const res = await request(app.getHttpServer())
        .post('/user/create')
        .send(userCreateRequest);

      expect(res.body).toEqual(createResponse);
    });
    it('データベースに登録されたユーザーが存在すること', async () => {
      const user = await prisma.pUser.findUnique({
        where: {
          email: userCreateRequest.email,
        },
      });

      expect(user?.email).toEqual(userCreateRequest.email);
    });
  });
});
