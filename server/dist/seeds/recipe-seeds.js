import { Recipe } from '../models/recipe.js';
export const seedRecipes = async () => {
    await Recipe.bulkCreate([
        {
            recipeId: 649280,
            title: 'Lasagna Silvia',
            image: 'https://img.spoonacular.com/recipes/649280-312x231.jpg'
        },
        {
            recipeId: 633692,
            title: 'Baked Oatmeal with Dried Cranberries',
            image: 'https://img.spoonacular.com/recipes/633692-312x231.jpg'
        },
        {
            recipeId: 640067,
            title: 'Corn Bread',
            image: 'https://img.spoonacular.com/recipes/640067-312x231.jpg'
        },
        {
            recipeId: 634486,
            title: 'BBQ Beef Brisket',
            image: 'https://img.spoonacular.com/recipes/634486-312x231.jpg'
        },
        {
            recipeId: 638235,
            title: 'Chicken Parmesan With Pasta',
            image: 'https://img.spoonacular.com/recipes/638235-312x231.jpg'
        },
        {
            recipeId: 632021,
            title: 'Ahi Tuna Ceviche',
            image: 'https://img.spoonacular.com/recipes/632021-312x231.jpg'
        }
    ], { individualHooks: true });
};
