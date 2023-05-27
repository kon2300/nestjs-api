import { Test, TestingModule } from '@nestjs/testing';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptorCqrsModule';
import {
  IUserQueryService,
  USER_QUERY_SERVICE_PROVIDER,
} from '@/use-case/queries/user/userQueryServiceInterface';
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
  authLoginInputForFailedTest,
  authLoginInputForTest,
  userForTest,
} from '@/use-case/api/auth/login/__tests__/test-data/authLoginTestData';

describe('authLoginInteractorのテスト', () => {
  let authLoginInteractor: IAuthLoginUseCase;
  let userQueryService: IUserQueryService;
  let authService: IAuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AdaptorAuthModule, AdaptorCqrsModule],
      providers: [AuthLoginUseCaseProvider],
    }).compile();

    authLoginInteractor = moduleFixture.get<IAuthLoginUseCase>(
      AUTH_LOGIN_USE_CASE_PROVIDER,
    );
    userQueryService = moduleFixture.get<IUserQueryService>(
      USER_QUERY_SERVICE_PROVIDER,
    );
    authService = moduleFixture.get<IAuthService>(AUTH_SERVICE_PROVIDER);
  });

  describe('run', () => {
    describe('正常系', () => {
      it('登録済のユーザーであればログインできること', async () => {
        jest
          .spyOn(userQueryService, 'findByEmail')
          .mockResolvedValue(userForTest);
        jest
          .spyOn(authService, 'login')
          .mockResolvedValue({ accessToken: 'testAccessToken' });

        const output = await authLoginInteractor.run(authLoginInputForTest);

        expect(output).toStrictEqual({ accessToken: 'testAccessToken' });
      });
    });

    describe('異常系', () => {
      it('登録済ではないユーザーの場合ログインできないこと', async () => {
        jest.spyOn(userQueryService, 'findByEmail').mockResolvedValue(null);

        expect(authLoginInteractor.run(authLoginInputForTest)).rejects.toThrow(
          'ユーザが存在しません',
        );
      });

      it('emailとパスワードが一致しない場合ログインできないこと', async () => {
        jest
          .spyOn(userQueryService, 'findByEmail')
          .mockResolvedValue(userForTest);

        expect(
          authLoginInteractor.run(authLoginInputForFailedTest),
        ).rejects.toThrow('パスワード、もしくはメールアドレスに誤りがあります');
      });
    });
  });
});
