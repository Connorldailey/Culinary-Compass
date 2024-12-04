import {Instruction} from '../models/instruction';

export const InstructionsUsers = async () => {
    await Instruction.bulkCreate(
        [
            {
                recipeId: 1,
                ingredients: ['1 medium sweet onion finely chopped', '4 tablespoons olive oil', 'portabella mushrooms 8 ounces sliced', '2 tablespoons butter', '16 ounces frozen spinach thawed and drained well', '3 zuchini', '30 ounces ricotta cheese', '2 eggs', 'mozzarella cheese 2 cups', '1/2 cup grated parmesan', '1 quart tomato soup'],
                readyInMinutes: 45,
                servings: 8,
                instructions: 'The recipe Lasagna Silvian is ready in around 45 minutes and is definitely an amazing gluten free option for lovers of Mediterranean food. This recipe serves 8 and costs $2.64 per serving. One serving contains 523 calories, 27g of protein, and 34g of fat. 1 person were impressed by this recipe. A mixture of zucchini, pacific natural foods creamy tomato soup, portabella mushroom, and a handful of other ingredients are all it takes to make this recipe so delicious. Only a few people really liked this main course. It is brought to you by Foodista. Overall, this recipe earns a <b>solid spoonacular score of 66%</b>.'
            },
            {
                recipeId: 2,
                ingredients: ['Oats 1 cup', 'whole milk 1 cup', 'dried cranberries 1/4 cup', 'butter 1 tablespoon'],
                readyInMinutes: 45,
                servings:4,
                instructions: 'Bake in a preheated oven at 350 degrees for 45 minutes. Serve warm.'
            },
            {
                recipeId: 3,
                ingredients: ['cornmeal 1 cup', 'flour 1 cup', 'sugar 1/4 cup', 'baking powder 1 tablespoon', 'salt 1 teaspoon', 'milk 1 cup', 'egg 1', 'vegetable oil 1/4 cup'],
                readyInMinutes: 30,
                servings: 6,
                instructions: 'Mix dry ingredients. Add wet ingredients. Pour into greased 9x9 pan. Bake at 400 degrees for 30 minutes.'
            },
            {
                recipeId: 4,
                ingredients: ['beef brisket 1', 'bbq sauce 1 cup', 'beef broth 1 cup'],
                readyInMinutes: 240,
                servings: 6,
                instructions: 'Place brisket in slow cooker. Add bbq sauce and beef broth. Cook on low for 4 hours.'
            },
            {
                recipeId: 5,
                ingredients: ['chicken breast 1', 'pasta 1 cup', 'marinara sauce 1 cup', 'mozzarella cheese 1 cup'],
                readyInMinutes: 45,
                servings: 4,
                instructions: 'Cook chicken breast. Cook pasta. Layer pasta, marinara sauce, chicken, and cheese in a baking dish. Bake at 350 degrees for 30 minutes.'
            },
            {
                recipeId: 6,
                ingredients: ['tuna 1 pound', 'lime juice 1/4 cup', 'lemon juice 1/4 cup', 'orange juice 1/4 cup', 'cilantro 1/4 cup', 'jalapeno 1', 'avocado 1'],
                readyInMinutes: 30,
                servings: 4,
                instructions: 'Mix all ingredients. Let sit for 30 minutes. Serve.'
            }
        ],
        {individualHooks: true}
    );
};