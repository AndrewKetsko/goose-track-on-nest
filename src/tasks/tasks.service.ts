import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Types } from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async getOwnTasks(id: Types.ObjectId, month: string) {
    if (!month.match(/^20\d\d-(0[1-9]|1[012])$/)) {
      throw new BadRequestException('query param month do not match');
    }

    const result = await this.tasksRepository.findTasksByMonth(id, month);

    return { status: 200, data: result };
  }

  async postOwnTask(id: Types.ObjectId, body: CreateTaskDto) {
    const { priority = 'LOW', category = 'TODO', start, end } = body;

    const [startHour, startMin] = start.split(':');
    const [endHour, endMin] = end.split(':');

    if (startHour > endHour || (startHour === endHour && startMin > endMin)) {
      throw new NotAcceptableException(
        'Start time must be lower then end time',
      );
    }

    const task = await this.tasksRepository.createTask(id, {
      ...body,
      priority,
      category,
    });

    task.owner = undefined;

    return { status: 201, data: task };
  }

  async patchOwnTask(
    userId: Types.ObjectId,
    taskId: Types.ObjectId,
    body: UpdateTaskDto,
  ) {
    const task = await this.tasksRepository.findTaskById(taskId);

    if (task.owner._id.toString() !== userId.toString()) {
      throw new UnauthorizedException();
    }

    const { start, end } = body;

    if (start || end) {
      const [startHour, startMin] = start
        ? start.split(':')
        : task.start.split(':');
      const [endHour, endMin] = end ? end.split(':') : task.end.split(':');

      if (startHour > endHour || (startHour === endHour && startMin > endMin)) {
        throw new NotAcceptableException(
          'Start time must be lower then end time',
        );
      }
    }

    const updatedTask = await this.tasksRepository.updateTask(taskId, body);

    if (!updatedTask) {
      throw new NotFoundException();
    }

    updatedTask.owner = undefined;

    return { status: 200, data: updatedTask };
  }

  async deleteOwnTask(userId: Types.ObjectId, taskId: Types.ObjectId) {
    const task = await this.tasksRepository.findTaskById(taskId);

    if (task.owner._id.toString() !== userId.toString()) {
      throw new UnauthorizedException();
    }

    const removedTask = await this.tasksRepository.deleteTask(taskId);

    if (!removedTask) {
      throw new NotFoundException();
    }

    task.owner = undefined;

    return { status: 200, data: task };
  }
}
