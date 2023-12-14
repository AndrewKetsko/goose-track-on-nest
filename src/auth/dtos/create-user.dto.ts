import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4, { message: 'Password is too short' })
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 40)
  userName: string;
}
