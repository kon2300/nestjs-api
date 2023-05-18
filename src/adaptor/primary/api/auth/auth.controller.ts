import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import {
  AUTH_LOGIN_USE_CASE_PROVIDER,
  IAuthLoginUseCase,
} from '@/usecase/api/auth/login/auth.login.usecase';
import { AuthLoginRequest } from '@/adaptor/primary/api/auth/requests/auth.login.request';
import { createResponse } from '@/adaptor/primary/api/create.response';
import { AuthLoginResponse } from '@/adaptor/primary/api/auth/responses/auth.login.response';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_LOGIN_USE_CASE_PROVIDER)
    private readonly authLoginUseCase: IAuthLoginUseCase,
  ) {}

  @Post('login')
  async login(@Body() req: AuthLoginRequest): Promise<AuthLoginResponse> {
    const res = await this.authLoginUseCase.run(req);

    return createResponse(HttpStatus.OK, res);
  }
}
