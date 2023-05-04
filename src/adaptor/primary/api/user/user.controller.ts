import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/adaptor/primary/authentication/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
