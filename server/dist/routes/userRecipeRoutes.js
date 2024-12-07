import express from 'express';
import { getUserRecipes, addUserRecipe, updateUserRecipeCategory, deleteUserRecipe, } from '../userRecipesController';
import { authenticateToken } from '../middleware/auth'; // Auth middleware
const router = express.Router();
router.get('/api/user-recipes', authenticateToken, getUserRecipes);
router.post('/api/user-recipes', authenticateToken, addUserRecipe);
router.put('/api/user-recipes/:recipeId', authenticateToken, updateUserRecipeCategory);
router.delete('/api/user-recipes/:recipeId', authenticateToken, deleteUserRecipe);
export default router;
