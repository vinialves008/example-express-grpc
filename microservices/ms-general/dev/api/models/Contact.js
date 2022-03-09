import Sequelize, { Model } from 'sequelize';

class Contact extends Model {
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
            phone: Sequelize.STRING,
            email: Sequelize.STRING,
            default: Sequelize.BOOLEAN,
        }, {
            sequelize,
        });
    }

    static associate(models) {}
}

export default Contact;