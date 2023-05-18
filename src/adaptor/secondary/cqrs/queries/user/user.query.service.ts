import { PrismaService } from '@/adaptor/primary/rdbms/prisma/prisma.service';
import { User } from '@/domain/user/user.domain';
import {
  FindByEmailInputDto,
  FindByEmailOutputDto,
} from '@/usecase/queries/user/dto/user.query.find.by.email.dto';
import {
  IUserQueryService,
  USER_QUERY_SERVICE_PROVIDER,
} from '@/usecase/queries/user/user.query.service.interface';
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

    const user = new User();
    user.reConstructor(findUser as unknown as User);
    return user;
  }
}

export const UserQueryProvider: Provider = {
  provide: USER_QUERY_SERVICE_PROVIDER,
  useClass: UserQuery,
};
