import { PrismaService } from '@/adaptor/primary/rdbms/prisma/prisma.service';
import {
  FindByEmailInputDto,
  FindByEmailOutputDto,
} from '@/usecase/queries/user/find.unique.dto';
import {
  IUserQueryService,
  USER_QUERY_SERVICE_PROVIDER,
} from '@/usecase/queries/user/user.query.service.interface';
import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class UserQuery implements IUserQueryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(input: FindByEmailInputDto): Promise<FindByEmailOutputDto> {
    return this.prismaService.pUser.findUnique({
      where: {
        email: input.email,
      },
    });
  }
}

export const UserQueryProvider: Provider = {
  provide: USER_QUERY_SERVICE_PROVIDER,
  useClass: UserQuery,
};
