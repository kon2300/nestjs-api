import { Module, ValidationPipe } from '@nestjs/common';
import { AdaptorApiModule } from '@/adaptor/primary/api/adaptorApiModule';
import { UseCaseModule } from '@/usecase/useCaseModule';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptorCqrsModule';
import { AdaptorAuthModule } from '@/adaptor/primary/authentication/adaptorAuthModule';
import { AdaptorRdbmsPrismaModule } from '@/adaptor/primary/rdbms/prisma/adaptorPrismaModule';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    AdaptorApiModule,
    UseCaseModule,
    AdaptorCqrsModule,
    AdaptorAuthModule,
    AdaptorRdbmsPrismaModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
  ],
})
export class AppModule {}
