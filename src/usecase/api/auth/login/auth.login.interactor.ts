import { Inject, Injectable, Provider } from '@nestjs/common';
import {
  AUTH_LOGIN_USE_CASE_PROVIDER,
  IAuthLoginUseCase,
} from '@/usecase/api/auth/login/auth.login.usecase';
import {
  AUTH_SERVICE_PROVIDER,
  IAuthService,
} from '@/usecase/authentication/auth.service.interface';
import {
  IUserQueryService,
  USER_QUERY_SERVICE_PROVIDER,
} from '@/usecase/queries/user/user.query.service.interface';
import {
  AuthLoginInputDto,
  AuthLoginOutputDto,
} from '@/usecase/api/auth/login/dto/auth.login.dto';

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

    const loginUser = user.login(input.password);

    const res = await this.authService.login(loginUser);

    return res;
  }
}

export const AuthLoginUseCaseProvider: Provider = {
  provide: AUTH_LOGIN_USE_CASE_PROVIDER,
  useClass: AuthLoginInteractor,
};
