import { Module } from '@nestjs/common';
import { AdaptorApiModule } from '@/adaptor/primary/api/adaptor.api.module';
import { UseCaseModule } from '@/usecase/usecase.module';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptor.cqrs.module';
import { AdaptorAuthModule } from '@/adaptor/primary/authentication/adaptor.auth.module';
import { AdaptorRdbmsPrismaModule } from '@/adaptor/primary/rdbms/prisma/adaptor.prisma.module';

@Module({
  imports: [
    AdaptorApiModule,
    UseCaseModule,
    AdaptorCqrsModule,
    AdaptorAuthModule,
    AdaptorRdbmsPrismaModule,
  ],
})
export class AppModule {}
