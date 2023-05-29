import { Module } from '@nestjs/common';
import { AdaptorApiModule } from '@/adaptor/primary/api/adaptorApiModule';
import { UseCaseModule } from '@/use-case/useCaseModule';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptorCqrsModule';
import { AdaptorAuthModule } from '@/adaptor/primary/authentication/adaptorAuthModule';
import { AdaptorRdbmsPrismaModule } from '@/adaptor/primary/rdbms/prisma/adaptorPrismaModule';

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
