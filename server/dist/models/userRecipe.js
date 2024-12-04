import { DataTypes, Model } from 'sequelize';
export class UserRecipe extends Model {
}
export function UserRecipeFactory(sequelize) {
    UserRecipe.init({
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        recipeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'recipes',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        category: {
            type: DataTypes.ENUM('try-it', 'favorite'),
            allowNull: false,
        },
    }, {
        tableName: 'user_recipes',
        sequelize,
    });
    return UserRecipe;
}
