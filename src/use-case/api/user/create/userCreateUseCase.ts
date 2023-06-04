import { UserCreateInputDto } from '@/use-case/api/user/create/dto/userCreateDto';

export const USER_CREATE_USE_CASE_PROVIDER = 'USER_CREATE_USE_CASE_PROVIDER';

export interface IUserCreateUseCase {
  /** ユーザーを作成する */
  run(input: UserCreateInputDto): Promise<void>;
}
