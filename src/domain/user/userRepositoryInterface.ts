import { SaveUser } from '@/domain/user/dto/saveUserDto';

export const USER_REPOSITORY_PROVIDER = 'USER_REPOSITORY_PROVIDER';

export interface IUserRepository {
  /** ユーザーを保存する */
  save(user: SaveUser): Promise<void>;
}
