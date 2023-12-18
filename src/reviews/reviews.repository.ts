import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';

@Injectable()
export class ReviewsRepository {
  constructor(@Inject('REVIEW_MODEL') private reviewModel: Model<Review>) {}

  getAllReviews(): Promise<Review[]> {
    return this.reviewModel.find().populate('owner', 'userName avatarURL -_id');
  }

  getReviewByOwner(owner: Types.ObjectId): Promise<Review> {
    return this.reviewModel.findOne({ owner });
  }

  createReview(owner: Types.ObjectId, body: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create({ owner, ...body });
  }

  updateReview(owner: Types.ObjectId, body: UpdateReviewDto): Promise<Review> {
    return this.reviewModel.findOneAndUpdate({ owner }, body, { new: true });
  }

  deleteReview(owner: Types.ObjectId): Promise<Review> {
    return this.reviewModel.findOneAndDelete({ owner });
  }
}
