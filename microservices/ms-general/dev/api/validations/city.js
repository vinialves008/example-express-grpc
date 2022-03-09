import * as yup from 'yup';

import ErrorsException from '../utils/error';
import FieldMessage from '../utils/fieldmessage';
import State from '../models/address/State';
import ValidateException from '../utils/validate';
import City from '../models/address/City';

const idValid = (id) => !Number.isNaN(id) && Number.isInteger(+id) && typeof id !== 'object';

const listCitiesInState = async(req, res, next) => {
    const errors = [];
    const params = {
        ...req.params,
        ...req.query,
    };
    const { stateId } = params;

    try {
        if (stateId && !idValid(stateId)) {
            errors.push(new FieldMessage('stateId', 'Parametro deve ser do tipo inteiro'));
            throw new ErrorsException(errors);

            const state = await State.findByPk(stateId);
            if (!state) {
                errors.push(new FieldMessage('stateId', 'Não existe estado com esse id'));
                throw new ErrorsException(errors);
            }
        }

        if (errors.length > 0) {
            throw new ErrorsException(errors);
        }
        return next();
    } catch (error) {
        return res
            .status(400)
            .send(new ValidateException(400, 'Erro ao buscar cidades!', req.url, error.errors));
    }
};

module.exports = {
    listCitiesInState,
};