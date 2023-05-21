import { SaveUser } from '@/domain/user/dto/saveUserDto';

export const USER_REPOSITORY_PROVIDER = 'USER_REPOSITORY_PROVIDER';

export interface IUserRepository {
  save(user: SaveUser): Promise<void>;
}
