import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { ConfigModule } from '@nestjs/config';
import { LoginRequest } from '@/adaptor/primary/api/auth/requests/login.request';

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

  const requestBody: LoginRequest = {
    username: 'john',
    password: 'changeme',
  };

  describe('正常系', () => {
    it('登録されたユーザがログインできること', async () => {
      request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)
        .expect(HttpStatus.OK);
      return;
    });
  });
});
