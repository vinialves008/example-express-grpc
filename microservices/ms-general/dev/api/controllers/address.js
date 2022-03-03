import { Op, Sequelize } from "sequelize";

import paginationFormatter from '../utils/paginationFormatter';

import Address from '../models/address/Address';

const addAddress = async (params) => {
    const address = await Address.create(params);
    return address;
};

module.exports = {
    addAddress,
}