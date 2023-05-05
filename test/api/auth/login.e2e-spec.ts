import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { ConfigModule } from '@nestjs/config';
import { LoginRequest } from '@/adaptor/primary/api/auth/requests/login.request';
import { LoginResponse } from '@/adaptor/primary/api/auth/responses/login.response';
import { RESPONSE_STATUS_DESCRIPTION } from '@/common/constants/response.status.description';

describe('【e2eテスト】/auth/login', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.testing',
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  const loginRequest: LoginRequest = {
    username: 'john',
    password: 'changeme',
  };

  const loginResponse: LoginResponse = {
    timeStamp: expect.anything(),
    statusCode: HttpStatus.OK,
    message: RESPONSE_STATUS_DESCRIPTION.OK,
    data: {
      accessToken: expect.anything(),
      user: {
        username: 'john',
      },
    },
  };

  describe('正常系', () => {
    it('登録されたユーザがログインできること', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginRequest);

      expect(res.body).toEqual(loginResponse);
    });
  });
});
