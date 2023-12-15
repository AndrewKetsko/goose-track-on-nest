import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './schemas/user.schema';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  registerUser(@Body(ValidationPipe) body: CreateUserDto) {
    return this.authService.registerUser(body);
  }

  @Post('/login')
  loginUser(@Body(ValidationPipe) body: LoginUserDto) {
    return this.authService.loginUser(body);
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  logOutUser(@GetUser('_id') id: Types.ObjectId) {
    return this.authService.logOutUser(id);
  }

  @Get('/current')
  @UseGuards(AuthGuard)
  getCurrentUser(@GetUser() user: User) {
    const token = user.token;
    user.token = undefined;
    user.password = undefined;
    return {
      status: 200,
      message: 'success',
      token,
      user,
    };
  }
}
