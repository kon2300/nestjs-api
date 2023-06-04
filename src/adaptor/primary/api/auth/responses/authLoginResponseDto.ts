import { BaseResponse } from '@/adaptor/primary/api/baseResponse';
import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthLoginResponse extends BaseResponse {
  @ApiResponseProperty({
    example: {
      accessToken: 'testAccessToken',
    },
    type: 'Object',
  })
  data: {
    accessToken: string;
  };
}
