import {
  S3ServiceGetFileInputDto,
  S3ServiceGetFileOutputDto,
} from '@/use-case/file-storage/dto/s3ServiceGetFileDto';
import {
  S3ServiceUploadFileInputDto,
  s3ServiceUploadFileOutputDto,
} from '@/use-case/file-storage/dto/s3ServiceUploadFileDto';
import {
  IS3Service,
  S3_SERVICE_PROVIDER,
} from '@/use-case/file-storage/s3ServiceInterface';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Provider,
} from '@nestjs/common';

@Injectable()
class S3Service implements IS3Service {
  private client: S3Client;

  private readonly bucketName: string;

  constructor() {
    (this.bucketName = process.env.AWS_BUCKET_NAME ?? 'test-bucket'),
      (this.client = new S3Client({
        region: process.env.AWS_REGION ?? 'ap-northeast-1',
        endpoint: process.env.AWS_S3_URL ?? 'http://localstack:4566',
        forcePathStyle: true,
        logger: console,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'testAccessKey',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'testSecretKey',
        },
      }));
  }

  async uploadFile(
    input: S3ServiceUploadFileInputDto,
  ): Promise<s3ServiceUploadFileOutputDto> {
    if (input.file == null) return { filePath: null };

    const { originalname, buffer, mimetype } = input.file;

    const filePath = `${new Date().toISOString()}_${originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filePath,
      Body: buffer,
      // MEMO: 指定しないと違うタイプに設定されてしまう
      ContentType: mimetype,
    });

    try {
      await this.client.send(command);

      return {
        filePath,
      };
    } catch (e: unknown) {
      if (e instanceof S3ServiceException) {
        throw new HttpException(e.message, e.$response?.statusCode as number);
      }

      throw new HttpException(
        '予期せぬエラーが発生しました',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFile(
    input: S3ServiceGetFileInputDto,
  ): Promise<S3ServiceGetFileOutputDto> {
    if (input.filePath == null) return { file: null };

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: input.filePath,
    });

    try {
      const res = await this.client.send(command);

      // MEMO: バイナリに変換する
      const file = await res.Body?.transformToByteArray();

      return {
        // MEMO: jsonで送信できるようにバイナリをエンコードする
        file: file ? Buffer.from(file).toString('base64') : null,
      };
    } catch (e: unknown) {
      if (e instanceof S3ServiceException) {
        throw new HttpException(e.message, e.$response?.statusCode as number);
      }

      throw new HttpException(
        '予期せぬエラーが発生しました',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const S3ServiceProvider: Provider = {
  provide: S3_SERVICE_PROVIDER,
  useClass: S3Service,
};
