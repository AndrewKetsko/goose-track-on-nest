import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private userModel: Model<Task>) {}

  getOwnTasks() {}

  postOwnTask() {}

  patchOwnTAsk(id: number) {
    return id;
  }

  deleteOwnTask(id: number) {
    return id;
  }
}
