import { Injectable } from '@nestjs/common';
import { Review, ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(private reviewsRepository: ReviewsRepository) {}

  getAllReviews(): Promise<Review[]> {
    return this.reviewsRepository.getAllReviews();
  }

  getOwnReview() {}

  postOwnRewiew() {}

  patchOwnRewiew() {}

  deleteOwnRewiew() {}
}
