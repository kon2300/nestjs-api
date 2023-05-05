import { User } from '@/domain/user/user';

export const USER_QUERY_SERVICE_PROVIDER = 'USER_QUERY_SERVICE_PROVIDER';

export interface IUserQueryService {
  findOne(username: string): Promise<User | undefined>;
}
