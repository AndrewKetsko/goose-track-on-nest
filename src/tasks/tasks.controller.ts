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
import { Task } from './schemas/task.schema';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getOwnTasks(
    @GetUser('_id') id: Types.ObjectId,
    @Query('month') month: string,
  ): Promise<{ status: number; data: Task[] }> {
    return this.tasksService.getOwnTasks(id, month);
  }

  @Post()
  postOwnTask(
    @GetUser('_id') id: Types.ObjectId,
    @Body(ValidationPipe) body: CreateTaskDto,
  ): Promise<{ status: number; data: Task }> {
    return this.tasksService.postOwnTask(id, body);
  }

  @Patch('/:id')
  patchOwnTask(
    @GetUser('_id') userId: Types.ObjectId,
    @Param('id') taskId: Types.ObjectId,
    @Body() body: UpdateTaskDto,
  ): Promise<{ status: number; data: Task }> {
    return this.tasksService.patchOwnTask(userId, taskId, body);
  }

  @Delete('/:id')
  deleteOwnTask(
    @GetUser('_id') userId: Types.ObjectId,
    @Param('id') taskId: Types.ObjectId,
  ): Promise<{ status: number; data: Task }> {
    return this.tasksService.deleteOwnTask(userId, taskId);
  }
}
