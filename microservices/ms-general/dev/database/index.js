import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Address from '../api/models/address/Address';
import City from '../api/models/address/City';
import Country from '../api/models/address/Country';
import State from '../api/models/address/State';
import Contact from '../api/models/Contact';

const models = [
    Address,
    City,
    Country,
    State,
    Contact,
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
