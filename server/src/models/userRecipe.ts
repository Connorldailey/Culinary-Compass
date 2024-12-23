import { DataTypes, Sequelize, Model } from 'sequelize';

interface UserRecipeAttributes {
    id?: number;
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