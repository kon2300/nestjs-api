import { Module } from '@nestjs/common';
import { PrismaService } from '@/adaptor/primary/rdbms/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AdaptorRdbmsPrismaModule {}
