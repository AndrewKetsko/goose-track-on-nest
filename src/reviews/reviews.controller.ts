import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  getAllReviews() {
    return this.reviewsService.getAllReviews();
  }

  @Get('/own')
  getOwnReview() {
    return this.reviewsService.getOwnReview();
  }

  @Post('/own')
  postOwnRewiew() {
    return this.reviewsService.postOwnRewiew();
  }

  @Patch('/own')
  patchOwnRewiew() {
    return this.reviewsService.patchOwnRewiew();
  }

  @Delete('/own')
  deleteOwnRewiew() {
    return this.reviewsService.deleteOwnRewiew();
  }
}
