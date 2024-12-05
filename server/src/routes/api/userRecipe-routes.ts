import express from 'express';
import {
    getUserRecipes,
    deleteUserRecipe
} from '../../controllers/userRecipe-controller.js';

const router = express.Router();

// Get all recipes a user has saved to a list
router.get('/getUserRecipes', getUserRecipes);

// Delete a recipe from the user's list
router.delete('/deleteUserRecipe/:userRecipeId', deleteUserRecipe);

export { router as userRecipeRouter };