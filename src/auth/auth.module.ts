import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { UsersModule } from '@/users/users.module';
import { LocalStrategy } from '@/auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/auth/constants';
import { JwtStrategy } from '@/auth/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
