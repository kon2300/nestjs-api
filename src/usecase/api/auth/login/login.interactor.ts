import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Provider,
} from '@nestjs/common';
import {
  LOGIN_USE_CASE_PROVIDER,
  ILoginUseCase,
} from '@/usecase/api/auth/login/login.usecase';
import {
  AUTH_SERVICE_PROVIDER,
  IAuthService,
} from '@/usecase/authentication/auth.service.interface';
import {
  IUserQueryService,
  USER_QUERY_SERVICE_PROVIDER,
} from '@/usecase/queries/user.query.service.interface';
import {
  LoginInputDto,
  LoginOutputDto,
} from '@/usecase/api/auth/login/login.dto';

@Injectable()
class LoginInteractor implements ILoginUseCase {
  constructor(
    @Inject(AUTH_SERVICE_PROVIDER) private readonly authService: IAuthService,
    @Inject(USER_QUERY_SERVICE_PROVIDER)
    private readonly userQueryService: IUserQueryService,
  ) {}

  async run(input: LoginInputDto): Promise<LoginOutputDto> {
    const user = await this.userQueryService.findOne(input.username);

    if (!user)
      throw new HttpException('ユーザが存在しません', HttpStatus.NOT_FOUND);

    const res = await this.authService.login({
      username: user?.username,
    });
    return res;
  }
}

export const LoginUseCaseProvider: Provider = {
  provide: LOGIN_USE_CASE_PROVIDER,
  useClass: LoginInteractor,
};
