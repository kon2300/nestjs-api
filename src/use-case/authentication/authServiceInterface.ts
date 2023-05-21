import {
  AuthServiceLoginInputDto,
  AuthServiceLoginOutputDto,
} from '@/use-case/authentication/dto/authServiceLoginDto';

export const AUTH_SERVICE_PROVIDER = 'AUTH_SERVICE_PROVIDER';

export interface IAuthService {
  /** ユーザーを承認して、accessToken(JWT)を生成する */
  login(
    loginUser: AuthServiceLoginInputDto,
  ): Promise<AuthServiceLoginOutputDto>;
}
