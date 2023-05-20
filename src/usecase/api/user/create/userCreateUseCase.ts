import { UserCreateInputDto } from '@/usecase/api/user/create/dto/userCreateDto';

export const USER_CREATE_USE_CASE_PROVIDER = 'USER_CREATE_USE_CASE_PROVIDER';

export interface IUserCreateUseCase {
  run(input: UserCreateInputDto): Promise<void>;
}
