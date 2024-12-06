import { seedUsers } from './user-seeds.js';
import { seedRecipes } from './recipe-seeds.js';
import { seedUserRecipes } from './userRecipe-seeds.js';
import { sequelize } from '../models/index.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedRecipes();
    console.log('\n----- RECIPES SEEDED -----\n');

    await seedUserRecipes();
    console.log('\n----- USER RECIPES SEEDED -----\n')
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();