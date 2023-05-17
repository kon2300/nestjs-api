import { Module } from '@nestjs/common';
import { UserQueryProvider } from '@/adaptor/secondary/cqrs/queries/user/user.query.service';
import { AdaptorRdbmsPrismaModule } from '@/adaptor/primary/rdbms/prisma/adaptor.prisma.module';
import { UserRepositoryProvider } from '@/adaptor/secondary/cqrs/commands/user/user.repository';

@Module({
  imports: [AdaptorRdbmsPrismaModule],
  providers: [UserQueryProvider, UserRepositoryProvider],
  exports: [UserQueryProvider, UserRepositoryProvider],
})
export class AdaptorCqrsModule {}
