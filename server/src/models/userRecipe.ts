import { DataTypes, Sequelize, Model } from 'sequelize';

interface UserRecipeAttributes {
    userId: number;
    recipeId: number;
    category: 'try-it' | 'favorite';
}

export class UserRecipe extends Model<UserRecipeAttributes> implements UserRecipeAttributes {
    public userId!: number;
    public recipeId!: number;
    public category!: 'try-it' | 'favorite';
}

export function UserRecipeFactory(sequelize: Sequelize): typeof UserRecipe {
    UserRecipe.init(
        {
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
        },
        {
            tableName: 'user_recipes',
            sequelize,
        }
    );
    return UserRecipe;
}