// import { Model } from  'mongoose';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  // isDeleted: boolean;
}

//for creating static

// export interface UserModel extends Model<TUser> {
//   isUserExists(id: string): Promise<TUser | null>;
// }
