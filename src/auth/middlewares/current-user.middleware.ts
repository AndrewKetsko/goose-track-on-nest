import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../auth.repository';
import { NextFunction, Request, Response } from 'express';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (!authorization || bearer !== 'Bearer') {
      throw new UnauthorizedException('not authorized hello');
    }

    try {
      const { id } = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
      const user = await this.authRepository.findUserById(id);

      if (!user || !user.token || user.token !== token) {
        throw new UnauthorizedException('not authorized');
      }
      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException('not authorized');
    }
  }
}
