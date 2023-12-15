import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { AuthGuard } from './guards/auth.guard';
// import { MongooseModule } from '@nestjs/mongoose';
// import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TasksModule,
    ReviewsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // MongooseModule.forRoot(process.env.DB_HOST),
    // DatabaseModule,
  ],
  // exports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
