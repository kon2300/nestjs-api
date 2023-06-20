import {
  S3ServiceGetFileInputDto,
  S3ServiceGetFileOutputDto,
} from '@/use-case/file-storage/dto/s3ServiceGetFileDto';
import {
  S3ServiceUploadFileInputDto,
  s3ServiceUploadFileOutputDto,
} from '@/use-case/file-storage/dto/s3ServiceUploadFileDto';

export const S3_SERVICE_PROVIDER = 'S3_SERVICE_PROVIDER';

export interface IS3Service {
  /** ファイルをアップロードする */
  uploadFile(
    input: S3ServiceUploadFileInputDto,
  ): Promise<s3ServiceUploadFileOutputDto>;

  /** アップロード済のファイルを取得する */
  getFile(input: S3ServiceGetFileInputDto): Promise<S3ServiceGetFileOutputDto>;
}
