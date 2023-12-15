import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  @IsOptional()
  @Matches(/^(?:\+\d|[\d\s\-./()]){10,20}$/)
  phone: string;

  @IsString()
  @IsOptional()
  skype: string;

  @IsString()
  @IsOptional()
  @Matches(/^(?:(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/\d{4})?$/)
  birthDay: string;
}
