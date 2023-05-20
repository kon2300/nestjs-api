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
  IUserQueryService,
  USER_QUERY_SERVICE_PROVIDER,
} from '@/use-case/queries/user/userQueryServiceInterface';

@Injectable()
class UserCreateInteractor implements IUserCreateUseCase {
  constructor(
    @Inject(USER_QUERY_SERVICE_PROVIDER)
    private readonly userQueryService: IUserQueryService,
    @Inject(USER_REPOSITORY_PROVIDER)
    private readonly userRepository: IUserRepository,
  ) {}

  async run(input: UserCreateInputDto): Promise<void> {
    const user = await this.userQueryService.findByEmail({
      email: input.email,
    });

    user.duplicate();

    user.reConstructor(input);
    user.create();

    await this.userRepository.upsert(user);

    return;
  }
}

export const UserCreateUseCaseProvider: Provider = {
  provide: USER_CREATE_USE_CASE_PROVIDER,
  useClass: UserCreateInteractor,
};
