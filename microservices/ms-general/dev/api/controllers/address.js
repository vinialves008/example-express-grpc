import Address from '../models/address/Address';
import City from '../models/address/City';
import State from '../models/address/State';

const listCitiesInState = async (params) => {
    const { stateId } = params;

    const cities = await City.findAll({
        attributes: ['id', 'name'],
        include: [
            {
                model: State,
                as: 'state',
                where: { id: stateId },
                attributes: ['id', 'name', 'initials'],
            },
        ],
    });

    return cities;
};

const listStates = async (params) => {
    const states = await State.findAll({
        attributes: ['id', 'name', 'initials'],
    });
    return states;
};

const addAddress = async (params) => {
    const address = await Address.create(params);
    return address;
};

module.exports = {
    listCitiesInState,
    listStates,
    addAddress,
}