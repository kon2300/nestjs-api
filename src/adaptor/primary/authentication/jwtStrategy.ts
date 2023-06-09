import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {
  AuthServiceValidateInputDto,
  AuthServiceValidateOutputDto,
} from '@/use-case/authentication/dto/authServiceValidateDto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY ?? 'testSecret',
    });
  }

  async validate(
    payload: AuthServiceValidateInputDto,
  ): Promise<AuthServiceValidateOutputDto> {
    return { iss: payload.iss, id: payload.id };
  }
}
