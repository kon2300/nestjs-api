import { Module } from '@nestjs/common';
import { AuthLoginUseCaseProvider } from '@/use-case/api/auth/login/authLoginInteractor';
import { AdaptorAuthModule } from '@/adaptor/primary/authentication/adaptorAuthModule';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptorCqrsModule';
import { UserCreateUseCaseProvider } from '@/use-case/api/user/create/userCreateInteractor';
import { AdaptorFileStorageModule } from '@/adaptor/primary/file-storage/adaptorFileStorageModule';
import { UserProfileUseCaseProvider } from '@/use-case/api/user/profile/userProfileInteractor';

@Module({
  imports: [AdaptorAuthModule, AdaptorCqrsModule, AdaptorFileStorageModule],
  providers: [
    AuthLoginUseCaseProvider,
    UserCreateUseCaseProvider,
    UserProfileUseCaseProvider,
  ],
  exports: [
    AuthLoginUseCaseProvider,
    UserCreateUseCaseProvider,
    UserProfileUseCaseProvider,
  ],
})
export class UseCaseModule {}
