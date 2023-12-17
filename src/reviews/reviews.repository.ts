import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
// import { ReviewModel } from './schemas/review.schema';

@Injectable()
export class ReviewsRepository {
  constructor(@Inject('REVIEW_MODEL') private reviewModel: Model<Review>) {}

  getAllReviews(): Promise<Review[]> {
    return this.reviewModel.find().populate('owner', 'userName avatarURL -_id');
  }

  getReviewByOwner(owner: Types.ObjectId) {
    return this.reviewModel.findOne({ owner });
  }

  createReview(owner: Types.ObjectId, body: CreateReviewDto) {
    return this.reviewModel.create({ owner, ...body });
  }

  updateReview(owner: Types.ObjectId, body: UpdateReviewDto) {
    return this.reviewModel.findOneAndUpdate({ owner }, body, { new: true });
  }

  deleteReview(owner: Types.ObjectId) {
    return this.reviewModel.findOneAndDelete({ owner });
  }
}
