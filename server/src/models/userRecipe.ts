import { DataTypes, Sequelize, Model } from 'sequelize';

interface UserRecipeAttributes {
    id?: number;
    userId: number;
    recipeId: number;
    category: 'try-it' | 'favorite';
}

export class UserRecipe extends Model<UserRecipeAttributes> implements UserRecipeAttributes {
<<<<<<< HEAD
    static find(_arg0: { userId: any; }) {
        throw new Error('Method not implemented.');
    }
    static findOneAndUpdate(_arg0: { userId: any; recipeId: string; }, _arg1: { category: any; }, _arg2: { new: boolean; }) {
        throw new Error('Method not implemented.');
    }
    static findOneAndDelete(_arg0: { userId: any; recipeId: string; }) {
        throw new Error('Method not implemented.');
    }
=======
    public id!: number;
>>>>>>> 7659945123ff53697481207520432e3ba97f774d
    public userId!: number;
    public recipeId!: number;
    public category!: 'try-it' | 'favorite';
}

export function UserRecipeFactory(sequelize: Sequelize): typeof UserRecipe {
    UserRecipe.init(
        {
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
        },
        {
            tableName: 'user_recipes',
            timestamps: false,
            sequelize,
            indexes: [
                {
                    unique: true,
                    fields: ['userId', 'recipeId', 'category'],
                },
            ],
        }
    );
    return UserRecipe;
}