import { Op } from "sequelize";

import paginationFormatter from '../utils/paginationFormatter';

import State from '../models/address/State';

const listStates = async (params) => {
    const { search = "", perPage = 10, page = 1, fieldOrder = 'name', order = 'ASC', } = params;

    if (Number(page) <= 0) page = 1;
    if (Number(perPage) < 0) perPage = 10;

    const states = await State.findAndCountAll({
        order: [[fieldOrder, order]],
        limit: perPage,
        offset: (page - 1) * perPage,
        attributes: ['id', 'name', 'initials'],
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: `%${search}%` } },
                { initials: { [Op.iLike]: `%${search}%` } }
            ]
        }
    });

    const result = paginationFormatter(
        states,
        page,
        perPage,
        states.count
    );


    return result;
};


module.exports = {
    listStates,
}