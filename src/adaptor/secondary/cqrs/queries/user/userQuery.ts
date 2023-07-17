import { PrismaService } from '@/adaptor/primary/rdbms/prisma/prismaService';
import {
  FindByEmailInputDto,
  FindByEmailOutputDto,
} from '@/use-case/queries/user/dto/findByEmailDto';
import {
  FindByIdInputDto,
  FindByIdOutputDto,
} from '@/use-case/queries/user/dto/findByIdDto';
import {
  IUserQuery,
  USER_QUERY_PROVIDER,
} from '@/use-case/queries/user/userQueryInterface';
import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class UserQuery implements IUserQuery {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(input: FindByEmailInputDto): Promise<FindByEmailOutputDto> {
    const findUser = await this.prismaService.pUser.findUnique({
      where: {
        email: input.email,
      },
    });

    return findUser;
  }

  async findById(input: FindByIdInputDto): Promise<FindByIdOutputDto> {
    const findUser = await this.prismaService.pUser.findUnique({
      where: {
        id: input.userId,
      },
    });

    return findUser;
  }
}

export const UserQueryProvider: Provider = {
  provide: USER_QUERY_PROVIDER,
  useClass: UserQuery,
};
