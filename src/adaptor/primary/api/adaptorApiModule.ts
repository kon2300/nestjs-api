import { Module } from '@nestjs/common';
import { AuthController } from '@/adaptor/primary/api/auth/authController';
import { UseCaseModule } from '@/usecase/useCaseModule';
import { UserController } from '@/adaptor/primary/api/user/userController';

@Module({
  imports: [UseCaseModule],
  controllers: [UserController, AuthController],
})
export class AdaptorApiModule {}
