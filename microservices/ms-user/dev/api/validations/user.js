const createUsers = async (req, res, next) => {
    const errors = [];

    try {

        if (errors.length > 0) {
            throw new ErrorsException(errors);
        }
        return next();
    } catch (error) {
        return res.status(400).send(new ValidateException(400,
            'Erro ao criar usuário!', req.url, error.errors));
    }
};

const fetchUsers = async (req, res, next) => {
    const errors = [];

    try {

        if (errors.length > 0) {
            throw new ErrorsException(errors);
        }
        return next();
    } catch (error) {
        return res.status(400).send(new ValidateException(400,
            'Erro ao buscar usuário!', req.url, error.errors));
    }
};

module.exports = {
    createUsers,
    fetchUsers,
}