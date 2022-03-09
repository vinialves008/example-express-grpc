import { Validate } from '../utils/validate';
import { FieldMessage } from '../utils/fieldmessage';
import schema from './schemas/UserCreateSchemas';
import User from '../models/User';

export default async(req, res, next) => {
    const errors = [];
    const explodeError = (errors) =>
        res.status(400).send(new Validate(400, 'Não foi possível salvar usuário', req.url, errors));

    try {
        await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
        err.inner.forEach((error) => {
            errors.push(new FieldMessage(error.path, error.message));
        });

        return explodeError(errors);
    }

    const { email, birthDate, password } = req.body;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (!regex.test(password)) {
        errors.push(
            new FieldMessage(
                'password',
                'Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e oito caracteres.'
            )
        );
    }

    const user = await User.findOne({
        where: { email },
    });

    if (user) {
        errors.push(new FieldMessage('email', 'Email já cadastrado.'));
    }

    if (errors.length > 0) {
        return explodeError(errors);
    }

    return next();
};