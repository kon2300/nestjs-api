import {
  AuthLoginInputDto,
  AuthLoginOutputDto,
} from '@/usecase/api/auth/login/dto/authLoginDto';

export const AUTH_LOGIN_USE_CASE_PROVIDER = 'AUTH_LOGIN_USE_CASE_PROVIDER';

export interface IAuthLoginUseCase {
  run(input: AuthLoginInputDto): Promise<AuthLoginOutputDto>;
}
