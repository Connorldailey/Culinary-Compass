import express from 'express';
import { askAssistant } from '../../controllers/assistant-controller.js';

const router = express.Router();

router.post('/', askAssistant);

export { router as assistantRouter };