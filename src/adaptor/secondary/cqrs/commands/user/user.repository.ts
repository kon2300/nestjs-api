import { PrismaService } from '@/adaptor/primary/rdbms/prisma/prisma.service';
import { CreateUser } from '@/domain/user/user.domain';
import {
  IUserRepository,
  USER_REPOSITORY_PROVIDER,
} from '@/domain/user/user.repository.interface';
import { Injectable, Provider } from '@nestjs/common';

@Injectable()
class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: CreateUser): Promise<void> {
    await this.prismaService.pUser.create({ data: user });
    return;
  }
}

export const UserRepositoryProvider: Provider = {
  provide: USER_REPOSITORY_PROVIDER,
  useClass: UserRepository,
};
