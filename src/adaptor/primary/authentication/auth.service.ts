import {
  AUTH_SERVICE_PROVIDER,
  IAuthService,
} from '@/usecase/authentication/auth.service.interface';
import { Injectable, Provider, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class AuthService implements IAuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(inputPassword: string, password: string): Promise<any> {
    if (inputPassword === password) {
      return;
    }
    throw new UnauthorizedException(
      'パスワード、もしくはメールアドレスに誤りがあります',
    );
  }

  async login(user: { username: string }): Promise<{
    accessToken: string;
    user: { username: string };
  }> {
    const payload = { username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}

export const AuthServiceProvider: Provider = {
  provide: AUTH_SERVICE_PROVIDER,
  useClass: AuthService,
};
