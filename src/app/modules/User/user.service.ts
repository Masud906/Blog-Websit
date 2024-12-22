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

export const userServices = {
  registerUserIntoDB,
  getAllUser,
};
