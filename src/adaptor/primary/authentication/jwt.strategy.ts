import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {
  AuthValidateInputDto,
  AuthValidateOutputDto,
} from '@/usecase/authentication/dto/auth.validate.dto';

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
    payload: AuthValidateInputDto,
  ): Promise<AuthValidateOutputDto> {
    return { iss: payload.iss, userId: payload.userId };
  }
}
