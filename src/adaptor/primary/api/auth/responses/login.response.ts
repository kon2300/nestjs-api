import { BaseResponse } from '@/adaptor/primary/api/base.response';

export class LoginResponse extends BaseResponse {
  data: {
    accessToken: string;

    user: {
      username: string;
    };
  };
}
