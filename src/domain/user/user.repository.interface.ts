import { CreateUser } from '@/domain/user/dto/create.user.dto';

export const USER_REPOSITORY_PROVIDER = 'USER_REPOSITORY_PROVIDER';

export interface IUserRepository {
  create(user: CreateUser): Promise<void>;
}
