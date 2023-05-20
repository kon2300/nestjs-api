import { Module } from '@nestjs/common';
import { AuthLoginUseCaseProvider } from '@/usecase/api/auth/login/authLoginInteractor';
import { AdaptorAuthModule } from '@/adaptor/primary/authentication/adaptorAuthModule';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptorCqrsModule';
import { UserCreateUseCaseProvider } from '@/usecase/api/user/create/userCreateInteractor';

@Module({
  imports: [AdaptorAuthModule, AdaptorCqrsModule],
  providers: [AuthLoginUseCaseProvider, UserCreateUseCaseProvider],
  exports: [AuthLoginUseCaseProvider, UserCreateUseCaseProvider],
})
export class UseCaseModule {}
