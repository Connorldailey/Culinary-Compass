import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface RecipeAttributes {
    id: number;
    recipeId: number;
    title: string;
    image: string;
    userId: number;
    category: 'try-it' | 'favorite';
}

interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
    public id!: number;
    public recipeId!: number;
    public title!: string;
    public image!: string;
    public userId!: number;
    public category!: 'try-it' | 'favorite';
}

export function RecipeFactory(sequelize: Sequelize): typeof Recipe {
    Recipe.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            recipeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            category: {
                type: DataTypes.ENUM('try-it', 'favorite'),
                allowNull: false,
            },
        },
        {
            tableName: 'recipe',
            sequelize,
        }
    );

    return Recipe;
}