import { Inject, Injectable, Provider } from '@nestjs/common';
import {
  USER_CREATE_USE_CASE_PROVIDER,
  IUserCreateUseCase,
} from '@/usecase/api/user/create/userCreateUseCase';
import { UserCreateInputDto } from '@/usecase/api/user/create/dto/userCreateDto';
import { User } from '@/domain/user/user';
import {
  IUserRepository,
  USER_REPOSITORY_PROVIDER,
} from '@/domain/user/userRepositoryInterface';

@Injectable()
class UserCreateInteractor implements IUserCreateUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PROVIDER)
    private readonly userRepository: IUserRepository,
  ) {}

  async run(input: UserCreateInputDto): Promise<void> {
    const user = new User(input);
    const newUser = user.create();

    await this.userRepository.create(newUser);

    return;
  }
}

export const UserCreateUseCaseProvider: Provider = {
  provide: USER_CREATE_USE_CASE_PROVIDER,
  useClass: UserCreateInteractor,
};
