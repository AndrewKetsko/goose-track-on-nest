import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from './schemas/user.schema';
import { AuthRepository } from './auth.repository';
import { authProviders } from './auth.providers';
import { DatabaseModule } from 'src/database/database.module';
import { EmailService } from './email.service';

@Module({
  imports: [
    DatabaseModule,
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, ...authProviders, EmailService],
})
export class AuthModule {}
