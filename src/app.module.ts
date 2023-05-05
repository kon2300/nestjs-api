import { Module } from '@nestjs/common';
import { AdaptorApiModule } from '@/adaptor/primary/api/adaptor.api.module';
import { UseCaseModule } from '@/usecase/usecase.module';
import { AdaptorRdbmsModule } from '@/adaptor/secondary/rdbms/adaptor.rdbms.module';
import { AdaptorAuthModule } from '@/adaptor/primary/authentication/adaptor.auth.module';

@Module({
  imports: [
    AdaptorApiModule,
    UseCaseModule,
    AdaptorRdbmsModule,
    AdaptorAuthModule,
  ],
})
export class AppModule {}
