import { RequestHandler } from 'express';
import { adminServices } from './admin.service';

//make user blocked
const makeUserBlockByAdmin: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await adminServices.makeUserBlockedIntoDBByAdmin(
      userId,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//Delete Blog
const deleteBlogByAdmin: RequestHandler = async (req, res, next) => {
  try {
    const id = req?.params?.id;
    const result = adminServices.deleteBlogFromDBByAdmin(id);
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const adminControllers = {
  makeUserBlockByAdmin,
  deleteBlogByAdmin,
};
