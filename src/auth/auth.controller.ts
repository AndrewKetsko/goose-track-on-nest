import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

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
}
