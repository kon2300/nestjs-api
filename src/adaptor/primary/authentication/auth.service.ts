import {
  AUTH_SERVICE_PROVIDER,
  IAuthService,
} from '@/usecase/authentication/auth.service.interface';
import { Injectable, Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthLoginInputDto,
  AuthLoginOutputDto,
} from '@/usecase/authentication/login.dto';

@Injectable()
class AuthService implements IAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginUser: AuthLoginInputDto): Promise<AuthLoginOutputDto> {
    const payload = { iss: 'appName', userId: loginUser.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

export const AuthServiceProvider: Provider = {
  provide: AUTH_SERVICE_PROVIDER,
  useClass: AuthService,
};
