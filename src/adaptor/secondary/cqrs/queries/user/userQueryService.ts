import { PrismaService } from '@/adaptor/primary/rdbms/prisma/prismaService';
import {
  FindByEmailInputDto,
  FindByEmailOutputDto,
} from '@/use-case/queries/user/dto/findByEmailDto';
import {
  IUserQueryService,
  USER_QUERY_SERVICE_PROVIDER,
} from '@/use-case/queries/user/userQueryServiceInterface';
import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class UserQuery implements IUserQueryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(input: FindByEmailInputDto): Promise<FindByEmailOutputDto> {
    const findUser = await this.prismaService.pUser.findUnique({
      where: {
        email: input.email,
      },
    });

    return findUser;
  }
}

export const UserQueryProvider: Provider = {
  provide: USER_QUERY_SERVICE_PROVIDER,
  useClass: UserQuery,
};
