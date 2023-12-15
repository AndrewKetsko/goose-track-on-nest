import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './schemas/user.schema';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dtos/update-user.dto';

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
    return this.authService.getCurrentUser(user);
  }

  @Patch('/user')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar')) //need to check how to use CLOUDINARY in NEST!!!
  updateUser(
    @GetUser('_id') id: Types.ObjectId,
    @Body() body: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File, //need to find & paste URL to avatar !!!
  ) {
    return this.authService.updateUser(id, body, file);
  }
}
