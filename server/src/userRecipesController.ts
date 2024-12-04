import { Request, Response } from 'express';
import { UserRecipe } from './models/userRecipe'; // Import UserRecipe model

// Fetch all recipes for the current user
export const getUserRecipes = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assuming `req.user` contains the authenticated user's info
    const recipes = UserRecipe.find({ userId });

    res.status(200).json({
      message: 'Fetched user recipes successfully',
      recipes,
    });
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    res.status(500).json({ error: 'Failed to fetch user recipes.' });
  }
};

// Add a recipe to the user's list
export const addUserRecipe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assuming `req.user` contains the authenticated user's info
    const { recipeId, title, category } = req.body;

    // Validate request body
    if (!recipeId || !title || !category) {
      return res.status(400).json({ error: 'Recipe ID, title, and category are required.' });
    }

    // Add recipe to user's list
    const newRecipe = new UserRecipe({
      userId,
      recipeId, 
      category, // "favorites" or "try-it"
    });
    await newRecipe.save();

    return res.status(201).json({
      message: 'Recipe added successfully.',
      recipe: newRecipe,
    });
  } catch (error) {
    console.error('Error adding recipe:', error);
    return res.status(500).json({ error: 'Failed to add recipe.' });
  }
};

// Update the category of a user's recipe
export const updateUserRecipeCategory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { recipeId } = req.params;
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ error: 'Category is required.' });
    }

    const updatedRecipe = await UserRecipe.findOneAndUpdate(
        { userId, recipeId },
        { category },
        { new: true }
    );

    if (updatedRecipe === null) {
      return res.status(404).json({ error: 'Recipe not found.' });
    }

    return res.status(200).json({
      message: 'Recipe category updated successfully.',
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error('Error updating recipe category:', error);
    return res.status(500).json({ error: 'Failed to update recipe category.' });
  }
};

// Remove a recipe from the user's list
export const deleteUserRecipe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { recipeId } = req.params;

    const deletedRecipe = await UserRecipe.findOneAndDelete({ userId, recipeId });

    if (deletedRecipe === null) {
      return res.status(404).json({ error: 'Recipe not found.' });
    }

    return res.status(200).json({
      message: 'Recipe removed successfully.',
      recipe: deletedRecipe,
    });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return res.status(500).json({ error: 'Failed to remove recipe.' });
  }
};
