// import { Schema, model } from 'mongoose';

// export const ReviewSchema = new Schema(
//   {
//     review: { type: String, require: [true, 'Review text is required'] },
//     rating: {
//       type: Number,
//       require: [true, 'NO rating, NO review'],
//       enum: [1, 2, 3, 4, 5],
//     },
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: 'user',
//     },
//   },
//   { versionKey: false },
// );

// export const ReviewModel = model('review', ReviewSchema);

//----------------------------------------------------------

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

@Schema({ versionKey: false })
export class Review {
  @Prop({ required: [true, 'Review text is required'] })
  review: string;

  @Prop({
    required: [true, 'Review rating is required'],
    enum: [1, 2, 3, 4, 5],
  })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
