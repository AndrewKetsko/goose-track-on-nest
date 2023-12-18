import {
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { IsGreaterThan } from './is-greater-then-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(250)
  title: string;

  @IsString()
  @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
  start: string;

  @IsString()
  @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
  @IsGreaterThan('start', {
    message: 'end time must be bigger than start time',
  })
  end: string;

  @IsString()
  @IsOptional()
  @IsIn(['LOW', 'MEDIUM', 'HIGH'])
  priority: string;

  @IsString()
  @Matches(/^20\d\d-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])/)
  date: string;

  @IsString()
  @IsOptional()
  @IsIn(['TODO', 'INPROGRESS', 'DONE'])
  category: string;
}
