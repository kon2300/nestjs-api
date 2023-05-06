import { Module } from '@nestjs/common';
import { LoginUseCaseProvider } from '@/usecase/api/auth/login/login.interactor';
import { AdaptorAuthModule } from '@/adaptor/primary/authentication/adaptor.auth.module';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptor.cqrs.module';

@Module({
  imports: [AdaptorAuthModule, AdaptorCqrsModule],
  providers: [LoginUseCaseProvider],
  exports: [LoginUseCaseProvider],
})
export class UseCaseModule {}
