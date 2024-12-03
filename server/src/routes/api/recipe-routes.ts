import express from 'express';
import {
    searchRecipes,
    addRecipeToList,
} from '../../controllers/recipe-controller.js';

const router = express.Router();

// Search recipes via Spoonacular API
router.get('/search', searchRecipes);

// Add recipe to a list
router.post('/add', addRecipeToList);

export { router as recipeRouter };