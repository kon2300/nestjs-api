import { Module } from '@nestjs/common';
import { UserQueryProvider } from '@/adaptor/secondary/cqrs/queries/user/user.query.service';

@Module({
  providers: [UserQueryProvider],
  exports: [UserQueryProvider],
})
export class AdaptorCqrsModule {}
