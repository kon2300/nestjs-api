import { Module, ValidationPipe } from '@nestjs/common';
import { AdaptorApiModule } from '@/adaptor/primary/api/adaptor.api.module';
import { UseCaseModule } from '@/usecase/usecase.module';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptor.cqrs.module';
import { AdaptorAuthModule } from '@/adaptor/primary/authentication/adaptor.auth.module';
import { AdaptorRdbmsPrismaModule } from '@/adaptor/primary/rdbms/prisma/adaptor.prisma.module';
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
