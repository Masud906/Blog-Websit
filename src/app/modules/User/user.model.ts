/* eslint-disable @typescript-eslint/no-this-alias */
import { TUser } from './user.interface';
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: [true, 'Email Must be required'],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password Must be required'],
      maxlength: [20, 'Password can not be more than 10 character'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not valid. Role can only be either user or admin',
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    // isDeleted: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  },
);

//Pre Document middleware for Bycript Password
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const userModel = model<TUser>('user', userSchema);
