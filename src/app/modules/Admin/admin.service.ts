import AppError from '../../errors/AppError';
import { Blog } from '../Blog/blog.model';
import { TUser } from '../User/user.interface';
import { userModel } from '../User/user.model';

///Make User Blocked
const makeUserBlockedIntoDBByAdmin = async (
  id: string,
  payload: Partial<TUser>,
) => {
  //At first Check user exists or not
  const targetUser = await userModel.findById(id);
  if (!targetUser) {
    throw new AppError(404, 'This User not exists');
  }

  const result = await userModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

//Delete Blog
const deleteBlogFromDBByAdmin = async (id: string) => {
  //Check this id is exists or not

  const targetBlog = await Blog.findById(id);
  if (!targetBlog) {
    throw new AppError(404, 'This blog not exists');
  }

  const result = await Blog.findByIdAndDelete(id);
  return result; //
};

export const adminServices = {
  makeUserBlockedIntoDBByAdmin,
  deleteBlogFromDBByAdmin,
};
