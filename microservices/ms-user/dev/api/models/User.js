import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                get() {
                    return String(this.getDataValue('id'));
                },
            },
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.STRING,
            status: Sequelize.BOOLEAN,
            blocked: Sequelize.BOOLEAN,
            activated: Sequelize.BOOLEAN,
            activatedAt: Sequelize.DATE,
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.hasOne(models.UserAddress, {
            foreignKey: 'userId',
            as: 'userAddress',
        });
    }
}

export default User;