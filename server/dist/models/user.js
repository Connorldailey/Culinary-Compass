import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
export class User extends Model {
    async setPassword(password) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}
export function UserFactory(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 128],
            },
        },
    }, {
        tableName: 'users',
        sequelize,
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                await user.setPassword(user.password);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    await user.setPassword(user.password);
                }
            },
        },
    });
    return User;
}
export default User;
