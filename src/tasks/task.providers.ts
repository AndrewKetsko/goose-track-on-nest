import { Mongoose } from 'mongoose';
import { TaskSchema } from './schemas/task.schema';

export const taskProviders = [
  {
    provide: 'TASK_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Task', TaskSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
