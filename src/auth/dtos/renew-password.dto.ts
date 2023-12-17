import { IsEmail } from 'class-validator';

export class RenewPasswordDto {
  @IsEmail()
  email: string;
}
