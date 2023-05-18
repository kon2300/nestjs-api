import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {
  AuthServiceValidateInputDto,
  AuthServiceValidateOutputDto,
} from '@/usecase/authentication/dto/auth.service.validate.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(
    payload: AuthServiceValidateInputDto,
  ): Promise<AuthServiceValidateOutputDto> {
    return { iss: payload.iss, userId: payload.userId };
  }
}
