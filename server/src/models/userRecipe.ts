import { DataTypes, Sequelize, Model } from 'sequelize';

interface UserRecipeAttributes {
    userId: number;
    recipeId: number;
    category: 'try-it' | 'favorite';
}

export class UserRecipe extends Model<UserRecipeAttributes> implements UserRecipeAttributes {
    static find(_arg0: { userId: any; }) {
        throw new Error('Method not implemented.');
    }
    static findOneAndUpdate(_arg0: { userId: any; recipeId: string; }, _arg1: { category: any; }, _arg2: { new: boolean; }) {
        throw new Error('Method not implemented.');
    }
    static findOneAndDelete(_arg0: { userId: any; recipeId: string; }) {
        throw new Error('Method not implemented.');
    }
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