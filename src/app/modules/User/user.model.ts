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

// // pre save middleware/ hook : will work on create()  save()
// userSchema.pre('save', async function (next) {
//   // console.log(this, 'pre hook : we will save  data');
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this; // doc
//   // hashing password and save into DB
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// // post save middleware / hook
// userSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });

// // Query Middleware
// userSchema.pre('find', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// userSchema.pre('findOne', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// // [ {$match: { isDeleted : {  $ne: : true}}}   ,{ '$match': { id: '123456' } } ]

// userSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

// //creating a custom static method
// userSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await User.findOne({ id });
//   return existingUser;
// };

// export const User = model<TUser>('User', userSchema);
