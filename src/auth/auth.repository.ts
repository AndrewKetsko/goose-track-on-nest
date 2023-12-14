import { Inject, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from './schemas/user.schema';
import { Document, Model, Types } from 'mongoose';

export interface User extends Document {
  readonly userName: string;
  readonly email: string;
  readonly password: string;
  readonly phone: string;
  readonly skype: string;
  readonly birthDay: string;
  readonly token: string;
  readonly avatarURL: string;
  readonly verify: boolean;
  readonly verificationToken: string;
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
