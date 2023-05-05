import {
  LoginInputDto,
  LoginOutputDto,
} from '@/usecase/api/auth/login/login.dto';

export const LOGIN_USE_CASE_PROVIDER = 'LOGIN_USE_CASE_PROVIDER';

export interface ILoginUseCase {
  run(input: LoginInputDto): Promise<LoginOutputDto>;
}
