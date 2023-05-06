import { Module } from '@nestjs/common';
import { AuthLoginUseCaseProvider } from '@/usecase/api/auth/login/login.interactor';
import { AdaptorAuthModule } from '@/adaptor/primary/authentication/adaptor.auth.module';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptor.cqrs.module';
import { UserCreateUseCaseProvider } from '@/usecase/api/user/create/create.interactor';

@Module({
  imports: [AdaptorAuthModule, AdaptorCqrsModule],
  providers: [AuthLoginUseCaseProvider, UserCreateUseCaseProvider],
  exports: [AuthLoginUseCaseProvider, UserCreateUseCaseProvider],
})
export class UseCaseModule {}
