import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksRepository {
  constructor(
    @Inject('TASK_MODEL')
    private taskModel: Model<Task>,
  ) {}

  findTasksByMonth(id: Types.ObjectId, month: string) {
    return this.taskModel.find(
      {
        owner: id,
        date: { $regex: month, $options: 'i' },
      },
      '-owner',
    );
  }

  findTaskById(id: Types.ObjectId) {
    return this.taskModel.findById(id);
  }

  createTask(owner: Types.ObjectId, body: CreateTaskDto) {
    return this.taskModel.create({ owner, ...body });
  }

  updateTask(id: Types.ObjectId, body: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, body, { new: true });
  }

  deleteTask(id: Types.ObjectId) {
    return this.taskModel.findByIdAndDelete(id);
  }
}
