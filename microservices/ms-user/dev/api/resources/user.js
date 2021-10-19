import 'dotenv/config';
import ValidateException from '../exceptions/validate';
import verifyToken from '../middlewares/verifyToken';
import controller from "../controllers/user";
import validations from "../validations/user";

module.exports = (app) => {


    const baseURL = `${process.env.BASE_URL}`;


    app.get(`${baseURL}`, [validations.fetchUsers], async (req, res) => {
        try {
            const params = req.params;
            const result = await controller.fetchUsers(params);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }

    });

    app.post(`${baseURL}/`, [validations.createUsers], async (req, res) => {
        try {
            const params = req.body;
            const result = await controller.createUsers(params);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }

    });
};
