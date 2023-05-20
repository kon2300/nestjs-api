import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import {
  AUTH_LOGIN_USE_CASE_PROVIDER,
  IAuthLoginUseCase,
} from '@/usecase/api/auth/login/authLoginUseCase';
import { AuthLoginRequest } from '@/adaptor/primary/api/auth/requests/authLoginRequestDto';
import { createResponse } from '@/adaptor/primary/api/createResponse';
import { AuthLoginResponse } from '@/adaptor/primary/api/auth/responses/authLoginResponseDto';

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
