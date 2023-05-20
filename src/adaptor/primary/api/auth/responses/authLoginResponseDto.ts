import { BaseResponse } from '@/adaptor/primary/api/baseResponse';

export class AuthLoginResponse extends BaseResponse {
  data: {
    accessToken: string;
  };
}
