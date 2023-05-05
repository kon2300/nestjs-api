import { Module } from '@nestjs/common';
import { LoginUseCaseProvider } from '@/usecase/api/auth/login/login.interactor';
import { AdaptorAuthModule } from '@/adaptor/primary/authentication/adaptor.auth.module';
import { AdaptorRdbmsModule } from '@/adaptor/secondary/rdbms/adaptor.rdbms.module';

@Module({
  imports: [AdaptorAuthModule, AdaptorRdbmsModule],
  providers: [LoginUseCaseProvider],
  exports: [LoginUseCaseProvider],
})
export class UseCaseModule {}
