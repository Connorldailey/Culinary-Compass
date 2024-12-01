import {DataTypes,Sequelize, Model, Optional} from 'sequelize';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initUser(sequelize: Sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
       
    }, {
        tableName: 'users',
        sequelize
    });
    return User;
}

export default User;