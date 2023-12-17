import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Types } from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getOwnTasks(
    @GetUser('_id') id: Types.ObjectId,
    @Query('month') month: string,
  ) {
    return this.tasksService.getOwnTasks(id, month);
  }

  @Post()
  postOwnTask(
    @GetUser('_id') id: Types.ObjectId,
    @Body(ValidationPipe) body: CreateTaskDto,
  ) {
    return this.tasksService.postOwnTask(id, body);
  }

  @Patch('/:id')
  patchOwnTask(
    @GetUser('_id') userId: Types.ObjectId,
    @Param('id') taskId: Types.ObjectId,
    @Body() body: UpdateTaskDto,
  ) {
    return this.tasksService.patchOwnTask(userId, taskId, body);
  }

  @Delete('/:id')
  deleteOwnTask(
    @GetUser('_id') userId: Types.ObjectId,
    @Param('id') taskId: Types.ObjectId,
  ) {
    return this.tasksService.deleteOwnTask(userId, taskId);
  }
}
