import { Inject, Injectable, Provider } from '@nestjs/common';
import {
  AUTH_LOGIN_USE_CASE_PROVIDER,
  IAuthLoginUseCase,
} from '@/use-case/api/auth/login/authLoginUseCase';
import {
  AUTH_SERVICE_PROVIDER,
  IAuthService,
} from '@/use-case/authentication/authServiceInterface';
import {
  IUserQueryService,
  USER_QUERY_SERVICE_PROVIDER,
} from '@/use-case/queries/user/userQueryServiceInterface';
import {
  AuthLoginInputDto,
  AuthLoginOutputDto,
} from '@/use-case/api/auth/login/dto/authLoginDto';

@Injectable()
class AuthLoginInteractor implements IAuthLoginUseCase {
  constructor(
    @Inject(AUTH_SERVICE_PROVIDER) private readonly authService: IAuthService,
    @Inject(USER_QUERY_SERVICE_PROVIDER)
    private readonly userQueryService: IUserQueryService,
  ) {}

  async run(input: AuthLoginInputDto): Promise<AuthLoginOutputDto> {
    const user = await this.userQueryService.findByEmail({
      email: input.email,
    });

    user.exists();

    const loginUser = user.login(input.password);

    const res = await this.authService.login(loginUser);

    return res;
  }
}

export const AuthLoginUseCaseProvider: Provider = {
  provide: AUTH_LOGIN_USE_CASE_PROVIDER,
  useClass: AuthLoginInteractor,
};
