import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { recipeRouter } from './recipe-routes.js';

const router = Router();

router.use('/users', userRouter); // User routes
router.use('/recipes', recipeRouter); // Recipe routes

export default router;