import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewsRepository } from './reviews.repository';
import { DatabaseModule } from 'src/database/database.module';
import { reviewsProviders } from './reviews.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsRepository, ...reviewsProviders],
})
export class ReviewsModule {}
