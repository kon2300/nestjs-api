import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import {
  LOGIN_USE_CASE_PROVIDER,
  ILoginUseCase,
} from '@/usecase/api/auth/login/login.usecase';
import { LoginRequest } from '@/adaptor/primary/api/auth/requests/login.request';
import { LoginOutputDto } from '@/usecase/api/auth/login/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LOGIN_USE_CASE_PROVIDER)
    private readonly loginUseCase: ILoginUseCase,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() req: LoginRequest): Promise<LoginOutputDto> {
    return await this.loginUseCase.run(req);
  }
}
