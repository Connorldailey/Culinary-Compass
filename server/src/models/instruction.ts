import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface InstructionAttributes {
    id: number;
    recipeId: number,
    ingredients: string[],
    readyInMinutes: number,
    servings: number,
    instructions: string,
}

interface InstructionCreationAttributes extends Optional<InstructionAttributes, 'id'> {}

export class Instruction extends Model<InstructionAttributes, InstructionCreationAttributes> implements InstructionAttributes {
    public id!: number;
    public recipeId!: number;
    public ingredients!: string[];
    public readyInMinutes!: number;
    public servings!: number;
    public instructions!: string;
}

export function InstructionFactory(sequelize: Sequelize): typeof Instruction {
    Instruction.init(
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
                references: {
                    model: 'recipes',
                    key: 'id',
                }
            },
            ingredients: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
            readyInMinutes: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            servings: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            instructions: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: 'instructions',
            sequelize,
        }
    );

    return Instruction;
}