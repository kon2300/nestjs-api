import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import {
  LOGIN_USE_CASE_PROVIDER,
  ILoginUseCase,
} from '@/usecase/api/auth/login/login.usecase';
import { LoginRequest } from '@/adaptor/primary/api/auth/requests/login.request';
import { createResponse } from '@/adaptor/primary/api/create.response';
import { LoginResponse } from '@/adaptor/primary/api/auth/responses/login.response';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LOGIN_USE_CASE_PROVIDER)
    private readonly loginUseCase: ILoginUseCase,
  ) {}

  @Post('login')
  async login(@Body() req: LoginRequest): Promise<LoginResponse> {
    const res = await this.loginUseCase.run(req);

    return createResponse(HttpStatus.OK, res);
  }
}
