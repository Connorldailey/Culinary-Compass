import { DataTypes, Model } from 'sequelize';
export class Instruction extends Model {
}
export function InstructionFactory(sequelize) {
    Instruction.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'recipes',
                key: 'id',
            }
        },
        ingredients: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        readyInMinutes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        servings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: 'instructions',
        sequelize,
    });
    return Instruction;
}
