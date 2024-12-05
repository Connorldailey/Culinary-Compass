import { Request, Response } from 'express';

import { Instruction } from '../models/instruction.js';

export const getInstructions = async (req: Request, res: Response) => {
    const { recipeId } = req.params; // Get the recipeId from the request parameters

    if (!recipeId) {
        return res.status(400).json({ message: 'recipeId is required.' });
    }

    try {
        let instructions = await Instruction.findOne({ where: { recipeId } });

        if (!instructions) {
            return res.status(404).json({ message: 'Instructions not found.' });
        }
        return res.status(201).json({
            message: 'GET instructions successful',
            data: instructions,
        });
    }  catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to get instuctions.' });
    }
};