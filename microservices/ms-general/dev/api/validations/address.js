import * as yup from 'yup';

import { BadRequestException } from '../exceptions/BadRequestException';
import FieldMessage from '../utils/fieldmessage';
import State from '../models/address/State';
import ValidateException from '../utils/validate';
import City from '../models/address/City';

const idValid = (id) => !Number.isNaN(id) && Number.isInteger(+id) && typeof id !== 'object';

const addressSchema = yup.object().shape({
    zipCode: yup.string().required('Campo Obrigatório'),
    street: yup.string().required('Campo Obrigatório'),
    neighborhood: yup.string().required('Campo Obrigatório'),
    numberHouse: yup.string().required('Campo Obrigatório'),
    complement: yup.string().required('Campo Obrigatório'),
    referencePoint: yup.string().required('Campo Obrigatório'),
    cityId: yup.number('Cidade inválida.').integer().required('Campo Obrigatório'),
});

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
            throw new BadRequestException(errors);

            const state = await State.findByPk(stateId);
            if (!state) {
                errors.push(new FieldMessage('stateId', 'Não existe estado com esse id'));
                throw new BadRequestException(errors);
            }
        }

        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
        return next();
    } catch (error) {
        return res
            .status(400)
            .send(new ValidateException(400, 'Erro ao buscar cidades!', req.url, error.errors));
    }
};
const addAddress = async(req, res, next) => {
    const errors = [];

    try {
        try {
            await addressSchema.validate(req.body, { abortEarly: false });

            const { cityId } = req.body;

            const city = await City.findByPk(cityId);

            if (!city) {
                errors.push(new FieldMessage('cityId', 'Cidade não encontrada.'));
            }
        } catch (err) {
            err.inner.forEach((error) => {
                errors.push(new FieldMessage(error.path, error.message));
            });
            throw new BadRequestException(errors);
        }

        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
    } catch (error) {
        return res
            .status(400)
            .send(new ValidateException(400, 'Erro ao cadastrar Endereço', req.url, error.errors));
    }

    return next();
};

module.exports = {
    listCitiesInState,
    addAddress,
};