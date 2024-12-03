import { DataTypes, Model } from 'sequelize';
export class Recipe extends Model {
}
export function RecipeFactory(sequelize) {
    Recipe.init({
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
    }, {
        tableName: 'recipes',
        sequelize,
    });
    return Recipe;
}
