import { Module } from '@nestjs/common';
import { S3ServiceProvider } from '@/adaptor/primary/file-storage/s3Service';

@Module({
  providers: [S3ServiceProvider],
  exports: [S3ServiceProvider],
})
export class AdaptorFileStorageModule {}
