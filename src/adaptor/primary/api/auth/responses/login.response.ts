import { BaseResponse } from '@/adaptor/primary/api/base.response';

export class AuthLoginResponse extends BaseResponse {
  data: {
    accessToken: string;
  };
}
