import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../schemas/user.schema';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): Promise<User> => {
    const req = ctx.switchToHttp().getRequest();
    if (data) {
      return req.user[data];
    }
    return req.user;
  },
);
