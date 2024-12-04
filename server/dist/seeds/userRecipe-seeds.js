import { UserRecipe } from '../models/userRecipe';
export const seedUserRecipes = async () => {
    await UserRecipe.bulkCreate([
        {
            userId: 1,
            recipeId: 1,
            category: 'favorite',
        },
        {
            userId: 1,
            recipeId: 2,
            category: 'try-it',
        },
        {
            userId: 2,
            recipeId: 3,
            category: 'favorite',
        },
        {
            userId: 2,
            recipeId: 4,
            category: 'try-it',
        },
        {
            userId: 3,
            recipeId: 5,
            category: 'favorite',
        },
        {
            userId: 3,
            recipeId: 6,
            category: 'try-it',
        }
    ]);
};
