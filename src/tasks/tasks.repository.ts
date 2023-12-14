import { Inject, Injectable } from '@nestjs/common';
import { Document, Model, Types } from 'mongoose';

export interface Task extends Document {
  readonly title: string;
  readonly start: string;
  readonly end: string;
  readonly priority: string;
  readonly date: string;
  readonly category: string;
  readonly owner: Types.ObjectId;
}

@Injectable()
export class TasksRepository {
  constructor(
    @Inject('TASK_MODEL')
    private readonly taskModel: Model<Task>,
  ) {}
}
