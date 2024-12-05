import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { recipeRouter } from './recipe-routes.js';
import { userRecipeRouter } from './userRecipe-routes.js';
import { instructionRouter } from './instructions-routes.js';

const router = Router();

router.use('/users', userRouter); // User routes
router.use('/recipes', recipeRouter); // Recipe routes
router.use('/userRecipes', userRecipeRouter); // User Recipe routes
router.use('/instructions', instructionRouter); // Instruction routes

export default router;