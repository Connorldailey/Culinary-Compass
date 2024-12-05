import { Request, Response } from 'express';
import { UserRecipe } from '../models/userRecipe.js';
import { Recipe } from '../models/recipe.js';

export const getUserRecipes = async (req: Request, res: Response) => {
    const { category } = req.query;

    if (!category || typeof category !== 'string') {
        return res.status(400).json({ message: 'Category is required.' });
    }

    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated.' });
    }

    try {
        const userRecipes = await UserRecipe.findAll({
            where: {
                userId,
                category,
            },
            include: [
                {
                    model: Recipe,
                    attributes: ['id', 'title', 'image', 'recipeId'],
                },
            ],
        });

        if (!userRecipes || userRecipes.length === 0) {
            return res.status(404).json({ message: `No recipes found in ${category === 'favorite' ? 'favorites' : 'try it'} list.` });
        }

        // Extract the recipe details
        const recipes = userRecipes.map(userRecipe => {
            const recipe = (userRecipe as UserRecipe & { Recipe: Recipe }).Recipe;

            return {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                recipeId: recipe.recipeId,
                userRecipeId: userRecipe.id,
            };
        });

        return res.status(200).json({
            message: 'GET recipes successful',
            data: recipes,
        });
    } catch (error)  {
        console.error(error);
        return res.status(500).json({ message: 'Failed to get user recipes.' });
    }
}

export const deleteUserRecipe = async (req: Request, res: Response) => {
    const { userRecipeId } = req.params;

    if (!userRecipeId) {
        return res.status(400).json({ message: 'UserRecipe ID is required.' });
    }

    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated.' });
    }

    try {
        const userRecipe = await UserRecipe.findByPk(userRecipeId);

        if (!userRecipe) {
            return res.status(404).json({ message: 'User recipe not found.' });
        }

        if (userRecipe.userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this recipe.' });
        }

        await userRecipe.destroy();

        return res.status(200).json({ message: 'Recipe successfully removed from the list.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete user recipe.' });
    }
};
