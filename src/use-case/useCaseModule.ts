import { Module } from '@nestjs/common';
import { AuthLoginUseCaseProvider } from '@/use-case/api/auth/login/authLoginInteractor';
import { AdaptorAuthModule } from '@/adaptor/primary/authentication/adaptorAuthModule';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptorCqrsModule';
import { UserCreateUseCaseProvider } from '@/use-case/api/user/create/userCreateInteractor';

@Module({
  imports: [AdaptorAuthModule, AdaptorCqrsModule],
  providers: [AuthLoginUseCaseProvider, UserCreateUseCaseProvider],
  exports: [AuthLoginUseCaseProvider, UserCreateUseCaseProvider],
})
export class UseCaseModule {}
