import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

///Create Blog
const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

//Get All Blog New
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const { search, sortBy, sortOrder, filter } = query;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dbQuery: any = {};
  if (search && typeof search === 'string') {
    dbQuery.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  //Filtering
  if (filter && typeof filter === 'string') {
    //  dbQuery.author = dbQuery.author || {};
    dbQuery.author = filter; // Filter by author ID
  }

  //Sorting
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortOptions: any = {};
  if (sortBy === 'createdAt' || sortBy === 'title') {
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1; // Sort in descending or ascending order
  }

  const result = await Blog.find(dbQuery).sort(sortOptions).populate('author');
  // .populate("author");
  return result;
};

//Get Single Blog
const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id).populate('author');
  return result;
};

//Delete Blog
const deleteBlogFromDB = async (id: string, loggedUserId: string) => {
  ///Check author of blog
  const targetBlog = await Blog.findById(id);
  if (!targetBlog) {
    throw new AppError(404, 'This blog not exists');
  }
  const blogAuthorId = targetBlog?.author;

  if (loggedUserId !== blogAuthorId?.toString()) {
    throw new AppError(403, 'Blog ref id and user is not same');
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

//update Blog
const updateBlogIntoDB = async (
  id: string,
  payload: Partial<TBlog>,
  loggedUserId: string,
) => {
  //   console.log("Logged User id: ", loggedUserId);
  //   console.log("Here");

  ///Check author of blog
  const targetBlog = await Blog.findById(id);
  if (!targetBlog) {
    throw new AppError(404, 'This blog not exists');
  }

  const blogAuthorId = targetBlog?.author;

  if (loggedUserId !== blogAuthorId?.toString()) {
    throw new AppError(403, 'Blog ref id and user is not same');
  }

  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  deleteBlogFromDB,
  updateBlogIntoDB,
};
