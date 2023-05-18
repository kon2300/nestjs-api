import {
  AUTH_SERVICE_PROVIDER,
  IAuthService,
} from '@/usecase/authentication/auth.service.interface';
import { Injectable, Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthServiceLoginInputDto,
  AuthServiceLoginOutputDto,
} from '@/usecase/authentication/dto/auth.service.login.dto';

@Injectable()
class AuthService implements IAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginUser: AuthServiceLoginInputDto): Promise<AuthServiceLoginOutputDto> {
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
