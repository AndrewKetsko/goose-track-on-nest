import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../auth/schemas/user.schema';
import mongoose from 'mongoose';

@Schema({ versionKey: false })
export class Task {
  @Prop({ required: [true, 'Task title is required'], max: 250 })
  title: string;

  @Prop({
    required: [true, 'Start time is required'],
    match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Start time do not match'],
  })
  start: string;

  @Prop({
    required: [true, 'End time is required'],
    match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'End time do not match'],
    //it doesnt work, i think!!!
    validate: {
      validator: function (v: string): boolean {
        return v >= this.start;
      },
      message: 'Start time must be lower then end time',
    },
    //-------------------
  })
  end: string;

  @Prop({
    default: 'LOW',
    // required: [true, 'Priority is required'],
    enum: ['LOW', 'MEDIUM', 'HIGH'],
  })
  priority: string;

  @Prop({
    required: [true, 'Date is required'],
    match: [
      /^20\d\d-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])/,
      'Date do not match',
    ],
  })
  date: string;

  @Prop({
    default: 'TODO',
    // required: [true, 'Category is required'],
    enum: ['TODO', 'INPROGRESS', 'DONE'],
  })
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
