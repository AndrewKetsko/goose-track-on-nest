import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Review, ReviewSchema } from './schemas/review.schema';
import { ReviewsRepository } from './reviews.repository';
import { DatabaseModule } from 'src/database/database.module';
import { reviewsProviders } from './reviews.providers';

@Module({
  imports: [
    DatabaseModule,
    // MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsRepository, ...reviewsProviders],
})
export class ReviewsModule {}
