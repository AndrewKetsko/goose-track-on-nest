import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Types } from 'mongoose';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { Review } from './schemas/review.schema';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  getAllReviews(): Promise<{ status: number; data: Review[] }> {
    return this.reviewsService.getAllReviews();
  }

  @Get('/own')
  @UseGuards(AuthGuard())
  getOwnReview(
    @GetUser('_id') id: Types.ObjectId,
  ): Promise<{ status: number; data: Review }> {
    return this.reviewsService.getOwnReview(id);
  }

  @Post('/own')
  @UseGuards(AuthGuard())
  postOwnRewiew(
    @GetUser('_id') id: Types.ObjectId,
    @Body(ValidationPipe) body: CreateReviewDto,
  ): Promise<{ status: number; data: Review }> {
    return this.reviewsService.postOwnRewiew(id, body);
  }

  @Patch('/own')
  @UseGuards(AuthGuard())
  patchOwnRewiew(
    @GetUser('_id') id: Types.ObjectId,
    @Body(ValidationPipe) body: UpdateReviewDto,
  ): Promise<{ status: number; data: Review }> {
    return this.reviewsService.patchOwnRewiew(id, body);
  }

  @Delete('/own')
  @UseGuards(AuthGuard())
  deleteOwnRewiew(
    @GetUser('_id') id: Types.ObjectId,
  ): Promise<{ status: number; data: Review }> {
    return this.reviewsService.deleteOwnRewiew(id);
  }
}
