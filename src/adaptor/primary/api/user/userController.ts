import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/adaptor/primary/authentication/jwtAuthGuard';
import { UserCreateRequest } from '@/adaptor/primary/api/user/requests/userCreateRequestDto';
import {
  IUserCreateUseCase,
  USER_CREATE_USE_CASE_PROVIDER,
} from '@/use-case/api/user/create/userCreateUseCase';
import { createResponse } from '@/adaptor/primary/api/createResponse';
import { BaseResponse } from '@/adaptor/primary/api/baseResponse';
import { CurrentUserId } from '@/common/decorators/currentUserIdDecorator';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  IUserProfileUseCase,
  USER_PROFILE_USE_CASE_PROVIDER,
} from '@/use-case/api/user/profile/userProfileUseCase';
import { UserGetProfileResponse } from '@/adaptor/primary/api/user/responses/userGetProfileResponse';

@ApiTags('/user')
@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_PROFILE_USE_CASE_PROVIDER)
    private readonly userProfileUsecase: IUserProfileUseCase,
    @Inject(USER_CREATE_USE_CASE_PROVIDER)
    private readonly userCreateUsecase: IUserCreateUseCase,
  ) {}

  @ApiCreatedResponse({
    description: 'ユーザ情報を取得する',
    type: UserGetProfileResponse,
  })
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @CurrentUserId() userId: string,
  ): Promise<UserGetProfileResponse> {
    const res = await this.userProfileUsecase.run({
      userId,
    });
    return createResponse(HttpStatus.OK, res);
  }

  @ApiCreatedResponse({
    description: 'ユーザーを新規作成する',
    type: BaseResponse,
  })
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() req: UserCreateRequest,
  ): Promise<BaseResponse> {
    await this.userCreateUsecase.run(req, file);
    return createResponse(HttpStatus.CREATED);
  }
}
