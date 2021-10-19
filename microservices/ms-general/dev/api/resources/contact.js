import 'dotenv/config';
import ValidateException from '../exceptions/validate';
import FieldMessageException from '../exceptions/fieldmessage';
import controller from "../controllers/contact";
import validations from "../validations/contact";

module.exports = (app) => {

    const baseURL = `${process.env.BASE_URL}/contact`;

    app.get(`${baseURL}/:id`, [validations.findOneContact], async (req, res) => {
        try {
            const params = req.params;
            const result = await controller.findOneContact(params);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }

    });

    app.post(`${baseURL}/`, [validations.addContact], async (req, res) => {
        try {
            const params = req.body;
            const result = await controller.addContact(params);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }

    });
};