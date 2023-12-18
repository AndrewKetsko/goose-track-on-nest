import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { DatabaseModule } from 'src/database/database.module';
import { taskProviders } from './task.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, ...taskProviders],
})
export class TasksModule {}
