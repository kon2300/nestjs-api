import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
  (_: unknown, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    if (!request.user) throw new ForbiddenException();
    return request.user.id;
  },
);
