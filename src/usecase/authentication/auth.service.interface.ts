import {
  AuthServiceLoginInputDto,
  AuthServiceLoginOutputDto,
} from '@/usecase/authentication/dto/auth.service.login.dto';

export const AUTH_SERVICE_PROVIDER = 'AUTH_SERVICE_PROVIDER';

export interface IAuthService {
  login(loginUser: AuthServiceLoginInputDto): Promise<AuthServiceLoginOutputDto>;
}
