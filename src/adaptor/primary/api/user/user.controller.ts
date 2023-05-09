import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/adaptor/primary/authentication/jwt-auth.guard';
import { UserCreateRequest } from '@/adaptor/primary/api/user/requests/create.request';
import {
  IUserCreateUseCase,
  USER_CREATE_USE_CASE_PROVIDER,
} from '@/usecase/api/user/create/create.usecase';
import { createResponse } from '@/adaptor/primary/api/create.response';
import { BaseResponse } from '@/adaptor/primary/api/base.response';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_CREATE_USE_CASE_PROVIDER)
    private readonly userCreateUsecase: IUserCreateUseCase,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('create')
  async create(@Body() req: UserCreateRequest): Promise<BaseResponse> {
    await this.userCreateUsecase.run(req);
    return createResponse(HttpStatus.CREATED);
  }
}
