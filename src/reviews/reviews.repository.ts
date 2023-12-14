import { Inject, Injectable } from '@nestjs/common';
import { Document, Model, Types } from 'mongoose';
// import { ReviewModel } from './schemas/review.schema';

export interface Review extends Document {
  readonly review: string;
  readonly rating: number;
  readonly owner: Types.ObjectId;
}

@Injectable()
export class ReviewsRepository {
  constructor(@Inject('REVIEW_MODEL') private reviewModel: Model<Review>) {}

  getAllReviews(): Promise<Review[]> {
    return this.reviewModel.find().populate('owner', 'userName avatarURL -_id');
  }
}
