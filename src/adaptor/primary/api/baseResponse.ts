import { ResponseStatusDescription } from '@/common/constants/responseStatusDescription';
import { HttpStatus } from '@nestjs/common';

export class BaseResponse {
  timeStamp: string;

  statusCode: HttpStatus;

  message: ResponseStatusDescription;
}
