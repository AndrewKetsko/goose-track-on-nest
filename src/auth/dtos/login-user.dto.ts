import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(4, { message: 'Password is too short' })
  password: string;

  @IsString()
  @IsEmail()
  email: string;
}
