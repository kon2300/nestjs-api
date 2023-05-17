import {
  AuthLoginInputDto,
  AuthLoginOutputDto,
} from '@/usecase/authentication/login.dto';

export const AUTH_SERVICE_PROVIDER = 'AUTH_SERVICE_PROVIDER';

export interface IAuthService {
  login(loginUser: AuthLoginInputDto): Promise<AuthLoginOutputDto>;
}
