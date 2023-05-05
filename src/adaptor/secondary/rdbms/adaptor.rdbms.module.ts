import { Module } from '@nestjs/common';
import { UserQueryProvider } from '@/adaptor/secondary/rdbms/queries/user/user.query.service';

@Module({
  providers: [UserQueryProvider],
  exports: [UserQueryProvider],
})
export class AdaptorRdbmsModule {}
