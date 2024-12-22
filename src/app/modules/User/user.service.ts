// // import config from '../../config';
// import { TUser } from './user.interface';
// import { User } from './user.model';

import { TUser } from './user.interface';
import { userModel } from './user.model';

const registerUserIntoDB = async (payload: TUser) => {
  //   console.log("Payload: ", payload);
  const result = await userModel.create(payload);
  return result;
};

//Get All User from DB
const getAllUser = async () => {
  const result = await userModel.find();
  return result;
};

// //Login User from DB
// const getUserFromDB = async () => {
//   const result = await userModel.findOne();
// };

export const userServices = {
  registerUserIntoDB,
  getAllUser,
};

// const createUserIntoDB = async (userData: TUser) => {
//   const result = await User.create(userData);
//   return result;
// };

// const getAllUserFromDB = async () => {
//   const result = await User.find();
//   return result;
// };

// const getSingleStudentFromDB = async (_id: string) => {
//   const result = await User.findOne({ _id });
//   return result;
// };

// const deleteUserFromDB = async (_id: string) => {
//   const result = await User.updateOne({ _id }, { isDeleted: true });
//   return result;
// };

// export const UserServices = {
//   createUserIntoDB,
//   getAllUserFromDB,
//   getSingleStudentFromDB,
//   deleteUserFromDB,
// };

// import { TUser } from "./user.interface";
// import { userModel } from "./user.model";

///Create User into db
