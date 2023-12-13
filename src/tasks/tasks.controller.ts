import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getOwnTasks() {
    return this.tasksService.getOwnTasks();
  }

  @Post()
  postOwnTask() {
    return this.tasksService.postOwnTask();
  }

  @Patch('/:id')
  patchOwnTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.patchOwnTAsk(id);
  }

  @Delete('/:id')
  deleteOwnTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteOwnTask(id);
  }
}
