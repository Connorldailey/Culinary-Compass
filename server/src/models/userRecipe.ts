import { DataTypes, Sequelize, Model } from 'sequelize';

interface UserRecipeAttributes {
    id: number;
    userId: number;
    recipeId: number;
    category: 'try-it' | 'favorite';
}

export class UserRecipe extends Model<UserRecipeAttributes> implements UserRecipeAttributes {
    public id!: number;
    public userId!: number;
    public recipeId!: number;
    public category!: 'try-it' | 'favorite';
}

export function UserRecipeFactory(sequelize: Sequelize): typeof UserRecipe {
    UserRecipe.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            recipeId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'recipes',
                    key: 'id',
                },
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