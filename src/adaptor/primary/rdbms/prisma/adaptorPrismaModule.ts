import { Module } from '@nestjs/common';
import { PrismaService } from '@/adaptor/primary/rdbms/prisma/prismaService';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AdaptorRdbmsPrismaModule {}
