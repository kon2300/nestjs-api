import {
  UserProfileInputDto,
  UserProfileOutputDto,
} from '@/use-case/api/user/profile/dto/userProfileDto';

export const USER_PROFILE_USE_CASE_PROVIDER = 'USER_PROFILE_USE_CASE_PROVIDER';

export interface IUserProfileUseCase {
  /** ユーザー情報を取得する */
  run(input: UserProfileInputDto): Promise<UserProfileOutputDto>;
}
