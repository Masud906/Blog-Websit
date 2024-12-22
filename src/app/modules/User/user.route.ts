import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { userValidations } from './user.validation';
import { userControllers } from './user.controller';
// import { UserControllers } from './user.controller';
// import express, { NextFunction, Request, Response } from "express";
// import { userControllers } from "./user.controller";
// // import { AnyZodObject } from "zod";
// import { userValidations } from "./userValidation";
// import validateRequest from "../../middleware/validateRequest";
const router = express.Router();

router.post(
  '/',
  // validateRequest(userValidations.userValidationSchema),
  userControllers.registerUser,
);
router.get('/register', userControllers.getAllUsers);

export const userRoutes = router;

// const router = express.Router();

// router.post(
//   '/create-user',
//   //   validateRequest(UserValidation.userValidationSchema),
//   UserControllers.createUser,
// );

// router.get('/', UserControllers.GetAllStudents);

// router.get('/:userid', UserControllers.getSingleStudent);

// router.delete('/:userId', UserControllers.deleteUser);

// export const UserRoutes = router;
