import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface RecipeAttributes {
    id: number;
    recipeId: number;
    title: string;
    image: string;
}

interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
    public id!: number;
    public recipeId!: number;
    public title!: string;
    public image!: string;
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
                unique: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: true,
                },
            },
        },
        {
            tableName: 'recipes',
            sequelize,
        }
    );
    return Recipe;
}