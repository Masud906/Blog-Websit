import { Router } from 'express';
import { userRoutes } from '../modules/User/user.route';
import { blogRoutes } from '../modules/Blog/blog.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { AdminRoutes } from '../modules/Admin/admin.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth/register',
    route: userRoutes,
  },
  {
    path: '/auth/login',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
