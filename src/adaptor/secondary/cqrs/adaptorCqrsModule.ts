import { Module } from '@nestjs/common';
import { UserQueryProvider } from '@/adaptor/secondary/cqrs/queries/user/userQuery';
import { AdaptorRdbmsPrismaModule } from '@/adaptor/primary/rdbms/prisma/adaptorPrismaModule';
import { UserRepositoryProvider } from '@/adaptor/secondary/cqrs/commands/user/userRepository';

@Module({
  imports: [AdaptorRdbmsPrismaModule],
  providers: [UserQueryProvider, UserRepositoryProvider],
  exports: [UserQueryProvider, UserRepositoryProvider],
})
export class AdaptorCqrsModule {}
