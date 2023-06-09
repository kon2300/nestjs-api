import { PrismaService } from '@/adaptor/primary/rdbms/prisma/prismaService';
import { SaveUser } from '@/domain/user/dto/saveUserDto';
import {
  IUserRepository,
  USER_REPOSITORY_PROVIDER,
} from '@/domain/user/userRepositoryInterface';
import { Injectable, Provider } from '@nestjs/common';

@Injectable()
class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: SaveUser): Promise<void> {
    await this.prismaService.pUser.upsert({
      where: { email: user.email },
      create: user,
      update: user,
    });

    return;
  }
}

export const UserRepositoryProvider: Provider = {
  provide: USER_REPOSITORY_PROVIDER,
  useClass: UserRepository,
};
