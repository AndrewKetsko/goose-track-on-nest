import { Types } from 'mongoose';

export interface JwtPayload {
  email: string;
  id: Types.ObjectId;
}
