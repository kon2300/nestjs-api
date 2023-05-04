import { Module } from '@nestjs/common';
import { AuthController } from '@/adaptor/primary/api/auth/auth.controller';
import { UseCaseModule } from '@/usecase/usecase.module';
import { UserController } from '@/adaptor/primary/api/user/user.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [UserController, AuthController],
})
export class AdaptorApiModule {}
