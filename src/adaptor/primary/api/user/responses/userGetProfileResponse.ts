import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponse } from '@/adaptor/primary/api/baseResponse';

export class UserGetProfileResponse extends BaseResponse {
  @ApiResponseProperty({
    example: {
      id: 'testId',

      email: 'test@example.com',

      createdAt: '2000-10-10T10:10:10+9:00',

      updatedAt: '2000-10-10T10:10:10+9:00',

      file: 'test_file.pdf',
    },
    type: 'Object',
  })
  data: {
    id: string;

    email: string;

    createdAt: Date;

    updatedAt: Date;

    file: string | null;
  };
}
