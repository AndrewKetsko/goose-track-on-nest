import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { Types } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private reviewsRepository: ReviewsRepository) {}

  async getAllReviews(): Promise<{ status: number; data: Review[] }> {
    const result = await this.reviewsRepository.getAllReviews();
    return { status: 200, data: result };
  }

  async getOwnReview(
    id: Types.ObjectId,
  ): Promise<{ status: number; data: Review }> {
    const review = await this.reviewsRepository.getReviewByOwner(id);

    if (!review) {
      throw new NotFoundException();
    }

    review.owner = undefined;

    return { status: 200, data: review };
  }

  async postOwnRewiew(
    id: Types.ObjectId,
    body: CreateReviewDto,
  ): Promise<{ status: number; data: Review }> {
    let review = await this.reviewsRepository.getReviewByOwner(id);

    if (review) {
      throw new ConflictException('you can add one review only');
    }

    review = await this.reviewsRepository.createReview(id, body);

    review.owner = undefined;

    return { status: 201, data: review };
  }

  async patchOwnRewiew(
    id: Types.ObjectId,
    body: UpdateReviewDto,
  ): Promise<{ status: number; data: Review }> {
    let review = await this.reviewsRepository.getReviewByOwner(id);

    if (!review) {
      throw new NotFoundException('no review found');
    }

    review = await this.reviewsRepository.updateReview(id, body);

    if (!review) {
      throw new NotFoundException('DB conection error');
    }

    review.owner = undefined;

    return { status: 200, data: review };
  }

  async deleteOwnRewiew(
    id: Types.ObjectId,
  ): Promise<{ status: number; data: Review }> {
    const review = await this.reviewsRepository.deleteReview(id);

    if (!review) {
      throw new NotFoundException();
    }

    review.owner = undefined;

    return { status: 200, data: review };
  }
}
