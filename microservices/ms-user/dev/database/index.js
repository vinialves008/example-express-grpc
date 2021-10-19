import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../api/models/User';
import UserAddress from '../api/models/UserAddress';


const models = [
    User,
    UserAddress,
];

class DataBase {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models.forEach((model) => {
            model.init(this.connection);
        });

        models.forEach((model) => {
            model.associate && model.associate(this.connection.models);
        });
    }
}

export default new DataBase();
