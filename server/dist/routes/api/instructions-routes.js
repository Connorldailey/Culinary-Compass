import express from 'express';
import { getRecipeInstructions } from '../../controllers/instruction-contoller.js';
const router = express.Router();
router.get('/:recipeId', getRecipeInstructions);
export { router as instructionRouter };
