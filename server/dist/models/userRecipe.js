import { DataTypes, Model } from 'sequelize';
export class UserRecipe extends Model {
}
export function UserRecipeFactory(sequelize) {
    UserRecipe.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        recipeId: {
            type: DataTypes.INTEGER,
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
        timestamps: false,
        sequelize,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'recipeId', 'category'],
            },
        ],
    });
    return UserRecipe;
}
