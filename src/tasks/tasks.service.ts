import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getOwnTasks() {}

  postOwnTask() {}

  patchOwnTAsk(id: number) {
    return id;
  }

  deleteOwnTask(id: number) {
    return id;
  }
}
