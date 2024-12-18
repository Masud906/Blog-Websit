import { TUser } from './user.interface';
import { model, Schema } from 'mongoose';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
