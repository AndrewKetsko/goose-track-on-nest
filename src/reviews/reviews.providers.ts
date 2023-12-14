import { Mongoose } from 'mongoose';
import { ReviewSchema } from './schemas/review.schema';

export const reviewsProviders = [
  {
    provide: 'REVIEW_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('review', ReviewSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
