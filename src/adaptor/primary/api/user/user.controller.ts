import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/adaptor/primary/authentication/jwt-auth.guard';
import { UserCreateRequest } from '@/adaptor/primary/api/user/requests/user.create.request';
import {
  IUserCreateUseCase,
  USER_CREATE_USE_CASE_PROVIDER,
} from '@/usecase/api/user/create/user.create.usecase';
import { createResponse } from '@/adaptor/primary/api/create.response';
import { BaseResponse } from '@/adaptor/primary/api/base.response';
import { CurrentUserId } from '@/common/decorators/currentUserIdDecorator';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_CREATE_USE_CASE_PROVIDER)
    private readonly userCreateUsecase: IUserCreateUseCase,
  ) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUserId() userId: string) {
    return createResponse(HttpStatus.OK, { userId });
  }

  @Post('create')
  async create(@Body() req: UserCreateRequest): Promise<BaseResponse> {
    await this.userCreateUsecase.run(req);
    return createResponse(HttpStatus.CREATED);
  }
}
