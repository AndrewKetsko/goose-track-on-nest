import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  findUserByVerificationToken(verificationToken: string): Promise<User> {
    return this.userModel.findOne({ verificationToken });
  }

  findUserById(id: Types.ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  createUser(user: {
    email: string;
    userName: string;
    password: string;
    verificationToken: string;
  }): Promise<User> {
    return this.userModel.create(user);
  }

  async updateUserToken(id: Types.ObjectId, token: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { token });
  }

  async updateUser(id: Types.ObjectId, user: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { $set: user }, { new: true });
  }
}
