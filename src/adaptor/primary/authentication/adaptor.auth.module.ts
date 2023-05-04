import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/adaptor/primary/authentication/jwt.strategy';
import { AuthServiceProvider } from '@/adaptor/primary/authentication/auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_LOGIN_EXPIRES_IN },
    }),
  ],
  providers: [AuthServiceProvider, JwtStrategy],
  exports: [AuthServiceProvider],
})
export class AdaptorAuthModule {}
