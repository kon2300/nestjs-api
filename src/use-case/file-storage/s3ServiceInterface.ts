import {
  s3ServiceUploadFileInputDto,
  s3ServiceUploadFileOutputDto,
} from './dto/s3ServiceUploadFileDto';

export const S3_SERVICE_PROVIDER = 'S3_SERVICE_PROVIDER';

export interface IS3Service {
  /** ファイルをアップロードする */
  uploadFile(
    input: s3ServiceUploadFileInputDto,
  ): Promise<s3ServiceUploadFileOutputDto>;
}
