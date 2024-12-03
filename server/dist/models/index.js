import sequelize from '../config/connection.js';

import { UserFactory } from './user.js';
import { UserRecipeFactory } from './userRecipe.js';
import { RecipeFactory } from './recipe.js';
import { InstructionFactory } from './instruction.js';
const User = UserFactory(sequelize);
const UserRecipe = UserRecipeFactory(sequelize);
const Recipe = RecipeFactory(sequelize);
const Instruction = InstructionFactory(sequelize);
// Association between Recipe and Instruction
Recipe.hasOne(Instruction, { foreignKey: 'recipeId' });
Instruction.belongsTo(Recipe, { foreignKey: 'recipeId' });
// Many-to-Many association between User and Recipe through UserRecipe
User.belongsToMany(Recipe, {
    through: UserRecipe,
    foreignKey: 'userId',
    otherKey: 'recipeId',
});
Recipe.belongsToMany(User, {
    through: UserRecipe,
    foreignKey: 'recipeId',
    otherKey: 'userId',
});
// Define associations for UserRecipe
UserRecipe.belongsTo(User, { foreignKey: 'userId' });
UserRecipe.belongsTo(Recipe, { foreignKey: 'recipeId' });
User.hasMany(UserRecipe, { foreignKey: 'userId' });
Recipe.hasMany(UserRecipe, { foreignKey: 'recipeId' });
export { User, UserRecipe, Recipe, Instruction };
