import { Op, Sequelize } from 'sequelize';

import paginationFormatter from '../utils/paginationFormatter';

import Address from '../models/address/Address';
import City from '../models/address/City';
import State from '../models/address/State';

import { ObjectNotFoundException } from '../exceptions/ObjectNotFoundException';

const attributesAddress = [
    'id',
    'street',
    'zipCode',
    'neighborhood',
    'numberHouse',
    'complement',
    'referencePoint',
];
const attributesCity = ['id', 'name'];
const attributesState = ['id', 'name', 'initials'];

const addAddress = async(params) => {
    const address = await Address.create(params);
    return address;
};

const findById = async(params) => {
    const { id } = params;
    const address = await Address.findOne({
        attributes: attributesAddress,
        where: { id },
        include: [{
            model: City,
            as: 'city',
            attributes: attributesCity,
            include: [{ model: State, as: 'state', attributes: attributesState }],
        }, ],
    });

    if (!address) {
        throw new ObjectNotFoundException('Endereço não encontrado');
    }

    return address;
};

module.exports = {
    addAddress,
    findById,
};