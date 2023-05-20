import { UpsertUser } from '@/domain/user/dto/upsertUserDto';

export const USER_REPOSITORY_PROVIDER = 'USER_REPOSITORY_PROVIDER';

export interface IUserRepository {
  upsert(user: UpsertUser): Promise<void>;
}
