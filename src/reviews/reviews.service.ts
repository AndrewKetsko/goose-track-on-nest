import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './schemas/review.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private userModel: Model<Review>) {}

  getAllReviews(): Promise<Review[]> {
    return this.userModel.find().populate('owner', 'userName avatarURL -_id');
  }

  getOwnReview() {}

  postOwnRewiew() {}

  patchOwnRewiew() {}

  deleteOwnRewiew() {}
}
