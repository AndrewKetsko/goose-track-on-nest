import {
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { IsGreaterThan } from './create-task.dto';

export class UpdateTaskDto {
  @IsString()
  @MaxLength(250)
  @IsOptional()
  title: string;

  @IsString()
  @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
  @IsOptional()
  start: string;

  @IsString()
  @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
  @IsGreaterThan('start', {
    message: 'end time must be bigger than start time',
  })
  @IsOptional()
  end: string;

  @IsString()
  @IsIn(['LOW', 'MEDIUM', 'HIGH'])
  @IsOptional()
  priority: string;

  @IsString()
  @Matches(/^20\d\d-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])/)
  @IsOptional()
  date: string;

  @IsString()
  @IsIn(['TODO', 'INPROGRESS', 'DONE'])
  @IsOptional()
  category: string;
}
