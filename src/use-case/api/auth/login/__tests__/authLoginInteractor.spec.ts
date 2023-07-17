import { Test, TestingModule } from '@nestjs/testing';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptorCqrsModule';
import {
  IUserQuery,
  USER_QUERY_PROVIDER,
} from '@/use-case/queries/user/userQueryInterface';
import {
  AUTH_LOGIN_USE_CASE_PROVIDER,
  IAuthLoginUseCase,
} from '@/use-case/api/auth/login/authLoginUseCase';
import {
  AUTH_SERVICE_PROVIDER,
  IAuthService,
} from '@/use-case/authentication/authServiceInterface';
import { AuthLoginUseCaseProvider } from '@/use-case/api/auth/login/authLoginInteractor';
import { AdaptorAuthModule } from '@/adaptor/primary/authentication/adaptorAuthModule';
import {
  failedTestDataAuthLoginInput,
  testDataForAuthLoginInput,
  testDataForUser,
} from '@/use-case/api/auth/login/__tests__/test-data/authLoginTestData';

describe('authLoginInteractorのテスト', () => {
  let authLoginInteractor: IAuthLoginUseCase;
  let userQuery: IUserQuery;
  let authService: IAuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AdaptorAuthModule, AdaptorCqrsModule],
      providers: [AuthLoginUseCaseProvider],
    }).compile();

    authLoginInteractor = moduleFixture.get<IAuthLoginUseCase>(
      AUTH_LOGIN_USE_CASE_PROVIDER,
    );
    userQuery = moduleFixture.get<IUserQuery>(USER_QUERY_PROVIDER);
    authService = moduleFixture.get<IAuthService>(AUTH_SERVICE_PROVIDER);
  });

  describe('run', () => {
    describe('正常系', () => {
      it('登録済のユーザーであればログインできること', async () => {
        jest.spyOn(userQuery, 'findByEmail').mockResolvedValue(testDataForUser);
        jest
          .spyOn(authService, 'login')
          .mockResolvedValue({ accessToken: 'testAccessToken' });

        const output = await authLoginInteractor.run(testDataForAuthLoginInput);

        expect(output).toStrictEqual({ accessToken: 'testAccessToken' });
      });
    });

    describe('異常系', () => {
      it('登録済ではないユーザーの場合ログインできないこと', async () => {
        jest.spyOn(userQuery, 'findByEmail').mockResolvedValue(null);

        expect(
          authLoginInteractor.run(testDataForAuthLoginInput),
        ).rejects.toThrow('ユーザが存在しません');
      });

      it('emailとパスワードが一致しない場合ログインできないこと', async () => {
        jest.spyOn(userQuery, 'findByEmail').mockResolvedValue(testDataForUser);

        expect(
          authLoginInteractor.run(failedTestDataAuthLoginInput),
        ).rejects.toThrow('パスワード、もしくはメールアドレスに誤りがあります');
      });
    });
  });
});
