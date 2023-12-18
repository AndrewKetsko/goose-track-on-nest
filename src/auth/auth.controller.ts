import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService, EmailResponse, UserResponse } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './schemas/user.schema';
import { Types } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dtos/update-user.dto';
import { RenewPasswordDto } from './dtos/renew-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  registerUser(
    @Body(ValidationPipe) body: CreateUserDto,
  ): Promise<UserResponse> {
    return this.authService.registerUser(body);
  }

  @Post('/login')
  loginUser(@Body(ValidationPipe) body: LoginUserDto): Promise<UserResponse> {
    return this.authService.loginUser(body);
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  logOutUser(
    @GetUser('_id') id: Types.ObjectId,
  ): Promise<Partial<UserResponse>> {
    return this.authService.logOutUser(id);
  }

  @Get('/current')
  @UseGuards(AuthGuard())
  getCurrentUser(@GetUser() user: User) {
    //: Promise<UserResponse> didnt work !!!!!?????
    return this.authService.getCurrentUser(user);
  }

  @Patch('/user')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('avatar')) //need to check how to use CLOUDINARY in NEST!!!
  updateUser(
    @GetUser('_id') id: Types.ObjectId,
    @Body(ValidationPipe) body: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File, //need to find & paste URL to avatar !!!
  ): Promise<Partial<UserResponse>> {
    return this.authService.updateUser(id, body, file);
  }

  @Get('/verify/:verificationToken')
  verifyEmail(
    @Param('verificationToken') verificationToken: string,
  ): Promise<EmailResponse> {
    return this.authService.verifyEmail(verificationToken);
  }

  @Get('/sendVerifyEmail')
  @UseGuards(AuthGuard())
  sendVerifyEmail(@GetUser() user: User): Promise<Partial<EmailResponse>> {
    return this.authService.sendVerifyEmail(user);
  }

  @Post('/sendRenewPass')
  sendRenewPass(
    @Body(ValidationPipe) body: RenewPasswordDto,
  ): Promise<Partial<EmailResponse>> {
    return this.authService.sendRenewPass(body);
  }

  @Post('/changePassword')
  @UseGuards(AuthGuard())
  changePassword(
    @Body(ValidationPipe) body: ChangePasswordDto,
    @GetUser() user: User,
  ): Promise<Partial<EmailResponse>> {
    return this.authService.changePassword(body, user);
  }
}
