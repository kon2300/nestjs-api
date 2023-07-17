import { Inject, Injectable, Provider } from '@nestjs/common';
import {
  IUserQuery,
  USER_QUERY_PROVIDER,
} from '@/use-case/queries/user/userQueryInterface';
import { User } from '@/domain/user/user';
import {
  IS3Service,
  S3_SERVICE_PROVIDER,
} from '@/use-case/file-storage/s3ServiceInterface';
import {
  UserProfileInputDto,
  UserProfileOutputDto,
} from '@/use-case/api/user/profile/dto/userProfileDto';
import {
  IUserProfileUseCase,
  USER_PROFILE_USE_CASE_PROVIDER,
} from '@/use-case/api/user/profile/userProfileUseCase';

@Injectable()
class UserProfileInteractor implements IUserProfileUseCase {
  constructor(
    @Inject(USER_QUERY_PROVIDER)
    private readonly userQuery: IUserQuery,
    @Inject(S3_SERVICE_PROVIDER)
    private readonly s3Service: IS3Service,
  ) {}

  async run(input: UserProfileInputDto): Promise<UserProfileOutputDto> {
    const findUser = await this.userQuery.findById({
      userId: input.userId,
    });

    const user = new User(findUser);

    const getFileOutput = await this.s3Service.getFile(
      user.fileStorageProperty,
    );

    return {
      file: getFileOutput.file,
      ...user.profileProperty,
    };
  }
}

export const UserProfileUseCaseProvider: Provider = {
  provide: USER_PROFILE_USE_CASE_PROVIDER,
  useClass: UserProfileInteractor,
};
