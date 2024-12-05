import express from 'express';
import { getInstructions } from '../../controllers/instruction-contoller.js';

const router = express.Router();

router.get('/:recipeId', getInstructions);

export { router as instructionRouter };