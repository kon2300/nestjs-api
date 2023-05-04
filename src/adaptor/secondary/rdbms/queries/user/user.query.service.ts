import { User } from '@/domain/user/user';
import {
  IUserQueryService,
  USER_QUERY_SERVICE_PROVIDER,
} from '@/usecase/queries/user.query.service.interface';
import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class UserQuery implements IUserQueryService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}

export const UserQueryProvider: Provider = {
  provide: USER_QUERY_SERVICE_PROVIDER,
  useClass: UserQuery,
};
