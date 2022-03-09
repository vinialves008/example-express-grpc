import * as yup from 'yup';

import ErrorsException from '../utils/error';
import ValidateException from '../utils/validate';

const idValid = (id) => !Number.isNaN(id) && Number.isInteger(+id) && typeof id !== 'object';

const addContact = async(req, res, next) => {
    const errors = [];

    try {
        if (errors.length > 0) {
            throw new ErrorsException(errors);
        }
        return next();
    } catch (error) {
        return res
            .status(400)
            .send(new ValidateException(400, 'Erro ao adicionar contato!', req.url, error.errors));
    }
};
const findOneContact = async(req, res, next) => {
    const errors = [];

    try {
        if (errors.length > 0) {
            throw new ErrorsException(errors);
        }
    } catch (error) {
        return res
            .status(400)
            .send(new ValidateException(400, 'Erro ao buscar contato', req.url, error.errors));
    }

    return next();
};

module.exports = {
    addContact,
    findOneContact,
};