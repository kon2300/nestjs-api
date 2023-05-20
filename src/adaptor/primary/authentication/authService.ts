import {
  AUTH_SERVICE_PROVIDER,
  IAuthService,
} from '@/use-case/authentication/authServiceInterface';
import { Injectable, Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthServiceLoginInputDto,
  AuthServiceLoginOutputDto,
} from '@/use-case/authentication/dto/authServiceLoginDto';

@Injectable()
class AuthService implements IAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(
    loginUser: AuthServiceLoginInputDto,
  ): Promise<AuthServiceLoginOutputDto> {
    const payload = { iss: 'appName', userId: loginUser.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

export const AuthServiceProvider: Provider = {
  provide: AUTH_SERVICE_PROVIDER,
  useClass: AuthService,
};
