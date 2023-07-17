import { Inject, Injectable, Provider } from '@nestjs/common';
import {
  USER_CREATE_USE_CASE_PROVIDER,
  IUserCreateUseCase,
} from '@/use-case/api/user/create/userCreateUseCase';
import { UserCreateInputDto } from '@/use-case/api/user/create/dto/userCreateDto';
import {
  IUserRepository,
  USER_REPOSITORY_PROVIDER,
} from '@/domain/user/userRepositoryInterface';
import {
  IUserQuery,
  USER_QUERY_PROVIDER,
} from '@/use-case/queries/user/userQueryInterface';
import { User } from '@/domain/user/user';
import {
  IS3Service,
  S3_SERVICE_PROVIDER,
} from '@/use-case/file-storage/s3ServiceInterface';

@Injectable()
class UserCreateInteractor implements IUserCreateUseCase {
  constructor(
    @Inject(USER_QUERY_PROVIDER)
    private readonly userQuery: IUserQuery,
    @Inject(USER_REPOSITORY_PROVIDER)
    private readonly userRepository: IUserRepository,
    @Inject(S3_SERVICE_PROVIDER)
    private readonly s3Service: IS3Service,
  ) {}

  async run(
    input: UserCreateInputDto,
    file: Express.Multer.File,
  ): Promise<void> {
    const findUser = await this.userQuery.findByEmail({
      email: input.email,
    });

    const user = new User(findUser);

    user.duplicate();

    const uploadFileOutput = await this.s3Service.uploadFile({ file });

    user.reConstructor = { filePath: uploadFileOutput.filePath, ...input };

    user.create();

    await this.userRepository.save(user.saveProperty);

    return;
  }
}

export const UserCreateUseCaseProvider: Provider = {
  provide: USER_CREATE_USE_CASE_PROVIDER,
  useClass: UserCreateInteractor,
};
