import { Request, Response } from 'express';
import { Instruction } from '../models/instruction.js';
import axios from 'axios';

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

export const getRecipeInstructions = async (req: Request, res: Response) => {
    const { recipeId } = req.params;

    if (!recipeId) {
        return res.status(400).json({ message: 'Recipe ID is required.' });
    }

    try {
        // Check if the instructions exist in the database
        const instructions = await Instruction.findOne({ where: { recipeId } });

        if (instructions) {
            // If found, return the instructions from the database
            return res.status(200).json({
                message: 'Recipe instructions fetched from database successfully.',
                data: instructions,
            });
        } else {
            // If not found, fetch the instructions from Spoonacular
            const { data } = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
                params: { apiKey: SPOONACULAR_API_KEY },
            });

            // Extract the information you need
            const { extendedIngredients, readyInMinutes, servings, instructions: fetchedInstructions } = data;

            // Format the response to match your InstructionData structure
            const ingredients = extendedIngredients.map((ingredient: any) => ingredient.original);
            const instructionData = {
                ingredients,
                readyInMinutes,
                servings,
                instructions: fetchedInstructions,
            };

            // Return the fetched instructions without saving them
            return res.status(200).json({
                message: 'Recipe instructions fetched successfully from Spoonacular.',
                data: instructionData,
            });
        }
    } catch (error) {
        console.error('Failed to fetch recipe instructions:', error);
        return res.status(500).json({ message: 'Error fetching recipe instructions.' });
    }
};