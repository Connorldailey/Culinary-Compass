import { Request, Response } from 'express';
import axios from 'axios';

import { Recipe } from '../models/recipe.js';
import { UserRecipe } from '../models/userRecipe.js';
import { Instruction } from '../models/index.js';

const SPOONACULAR_API_KEY =  process.env.SPOONACULAR_API_KEY;

interface SpoonacularRecipe {
    id: number;
    title: string;
    image: string;
}

export const searchRecipes = async (req: Request, res: Response) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required.' });
    }

    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                query,
                apiKey: SPOONACULAR_API_KEY,
                number: 10,
            },
        });

        const recipes = response.data.results.map((recipe: SpoonacularRecipe) => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
        }));

        return res.json(recipes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching recipes.' });
    }
};

export const addRecipeToList = async (req: Request, res: Response) => {
    const { recipeId, userId, category } = req.body;

    if (!recipeId || !userId || !category) {
        return res.status(400).json({ message: 'recipeId, userId, and category are required.' });
    }

    try {
        // Check if the recipe already exists in the Recipe table
        let recipe = await Recipe.findOne({ where: { recipeId } });

        if (!recipe) {
            // Fetch recipe details from Spoonacular API
            const { data } = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
                params: { apiKey: SPOONACULAR_API_KEY },
            });

            const { title, image, extendedIngredients, readyInMinutes, servings, instructions } = data;

            // Create Recipe entry
            recipe = await Recipe.create({ recipeId, title, image });

            // Add to Instructions table
            const ingredients = extendedIngredients.map((ingredient: any) => ingredient.original);
            await Instruction.create({
                recipeId: recipe.id,
                ingredients,
                readyInMinutes,
                servings,
                instructions,
            });
        }

        // Add to UserRecipe table
        const userRecipe = await UserRecipe.create({ userId, recipeId: recipe.id, category });

        return res.status(201).json({
            message: 'Recipe added successfully.',
            data: userRecipe,
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add recipe.' });
    }
};