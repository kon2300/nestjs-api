import {
  RESPONSE_STATUS_DESCRIPTION,
  ResponseStatusDescription,
} from '@/common/constants/responseStatusDescription';
import { HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiResponseProperty({
    example: '2000-10-10T10:10:10+9:00', // yyyy-MM-ddTHH:mm:ss
  })
  timeStamp: string;

  @ApiResponseProperty({
    example: HttpStatus.OK,
    enum: HttpStatus,
  })
  statusCode: HttpStatus;

  @ApiResponseProperty({
    example: RESPONSE_STATUS_DESCRIPTION.OK,
    enum: Object.values(RESPONSE_STATUS_DESCRIPTION),
  })
  message: ResponseStatusDescription;
}
