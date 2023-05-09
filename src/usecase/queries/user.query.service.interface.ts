import { TestUser } from '@/domain/user/user.domain';

export const USER_QUERY_SERVICE_PROVIDER = 'USER_QUERY_SERVICE_PROVIDER';

export interface IUserQueryService {
  findOne(username: string): Promise<TestUser | undefined>;
}
