import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from 'src/auth/auth.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();

    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (!authorization || bearer !== 'Bearer') {
      throw new UnauthorizedException('not authorized 1');
    }

    try {
      const { id } = await this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });

      const user = await this.authRepository.findUserById(id);

      if (!user || !user.token || user.token !== token) {
        throw new UnauthorizedException('not authorized 2');
      }
      req.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('not authorized 3');
    }
  }
}
