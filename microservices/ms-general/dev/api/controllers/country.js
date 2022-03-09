import { Op, Sequelize } from "sequelize";

import paginationFormatter from '../utils/paginationFormatter';

import Country from '../models/address/Country';
import State from '../models/address/State';

const listCountries = async (params) => {
    const { search = "", perPage = 10, page = 1, fieldOrder = 'name', order = 'ASC', } = params;
    const whereItems = [{ name: { [Op.iLike]: `%${search}%` }, }]

    const where = { [Op.and]: whereItems };


    const countries = await Country.findAndCountAll({
        order: [[fieldOrder, order]],
        limit: perPage,
        offset: (page - 1) * perPage,
        attributes: ['id', 'name'],
        where,
        include: [

        ],
    });

    const result = paginationFormatter(
        countries,
        page,
        perPage,
        countries.count
    );


    return result;
};

module.exports = {
    listCountries,
}