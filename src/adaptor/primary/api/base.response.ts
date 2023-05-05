import { ResponseStatusDescription } from '@/common/constants/response.status.description';
import { HttpStatus } from '@nestjs/common';

export class BaseResponse {
  timeStamp: string;

  statusCode: HttpStatus;

  message: ResponseStatusDescription;
}
