import { Module, ValidationPipe } from '@nestjs/common';
import { AuthController } from '@/adaptor/primary/api/auth/authController';
import { UseCaseModule } from '@/use-case/useCaseModule';
import { UserController } from '@/adaptor/primary/api/user/userController';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [UseCaseModule],
  controllers: [UserController, AuthController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
  ],
})
export class AdaptorApiModule {}
