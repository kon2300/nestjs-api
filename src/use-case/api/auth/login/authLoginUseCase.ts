import {
  AuthLoginInputDto,
  AuthLoginOutputDto,
} from '@/use-case/api/auth/login/dto/authLoginDto';

export const AUTH_LOGIN_USE_CASE_PROVIDER = 'AUTH_LOGIN_USE_CASE_PROVIDER';

export interface IAuthLoginUseCase {
  /** ユーザーを承認する */
  run(input: AuthLoginInputDto): Promise<AuthLoginOutputDto>;
}
