import { Inject, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from './schemas/user.schema';
import { Document, Model, Types } from 'mongoose';

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  phone: string;
  skype: string;
  birthDay: string;
  token: string;
  avatarURL: string;
  verify: boolean;
  verificationToken: string;
}

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    // @InjectModel(User.name) private userModel: Model<User>
  ) {}

  findUser(email: string) {
    return this.userModel.findOne({ email });
  }

  findUserById(id: Types.ObjectId) {
    return this.userModel.findById(id);
  }

  createUser(user: {
    email: string;
    userName: string;
    password: string;
    verificationToken: string;
  }) {
    return this.userModel.create(user);
  }

  async updateUserToken(id: Types.ObjectId, token: string) {
    await this.userModel.findByIdAndUpdate(id, { token });
  }
}
