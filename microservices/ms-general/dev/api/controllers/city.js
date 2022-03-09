import { Op, Sequelize } from "sequelize";

import paginationFormatter from '../utils/paginationFormatter';

import City from '../models/address/City';
import State from '../models/address/State';

const listCitiesInState = async (params) => {
    const { stateId, search = "", perPage = 10, page = 1, fieldOrder = 'name', order = 'ASC', } = params;
    const whereItems = [{ name: { [Op.iLike]: `%${search}%` }, }]

    if (stateId) {
        whereItems.push({ stateId: Number(stateId) })
    }
    const where = { [Op.and]: whereItems };

    const cities = await City.findAndCountAll({
        order: [[fieldOrder, order]],
        limit: perPage,
        offset: (page - 1) * perPage,
        attributes: ['id', 'name'],
        where,
        include: [
            {
                model: State,
                as: 'state',
                attributes: ['id', 'name', 'initials'],
            },
        ],
    });

    const result = paginationFormatter(
        cities,
        page,
        perPage,
        cities.count
    );


    return result;
};

module.exports = {
    listCitiesInState,
}