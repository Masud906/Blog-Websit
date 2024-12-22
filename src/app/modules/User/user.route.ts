import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { userValidations } from './user.validation';
import { userControllers } from './user.controller';

const router = express.Router();

router.post(
  '/',
  // validateRequest(userValidations.userValidationSchema),
  userControllers.registerUser,
);
router.get('/register', userControllers.getAllUsers);

export const userRoutes = router;
