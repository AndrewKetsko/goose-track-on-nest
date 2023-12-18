import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: [true, 'Username is required'] })
  userName: string;

  @Prop({
    required: [true, 'Email is required'],
    unique: true,
    match:
      /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/,
  })
  email: string;

  @Prop({ required: [true, 'Password is required'] })
  password: string;

  @Prop({ default: '', match: /^(?:\+\d|[\d\s\-./()]){10,20}$/ })
  phone: string;

  @Prop({ default: '' })
  skype: string;

  @Prop({ default: '' })
  birthDay: string;

  @Prop({ default: null })
  token: string;

  @Prop({ default: '' })
  avatarURL: string;

  @Prop({ default: false })
  verify: boolean;

  @Prop({ required: [true, 'Verify token is required'] })
  verificationToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
