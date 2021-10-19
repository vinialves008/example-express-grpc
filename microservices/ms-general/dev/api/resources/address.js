import 'dotenv/config';
import ValidateException from '../exceptions/validate';
import FieldMessageException from '../exceptions/fieldmessage';
import controller from '../controllers/address'
import validations from "../validations/address";

module.exports = (app) => {

    const baseURL = `${process.env.BASE_URL}/address`;

    app.get(`${baseURL}/states/:stateId/cities`, [validations.listCitiesInState], async (req, res) => {
        const { stateId } = req.params;
        const params = { stateId };

        try {
            const result = await controller.listCitiesInState(params);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    });

    app.get(`${baseURL}/states`, async (req, res) => {
        try {
            const result = await controller.listStates();
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    });

    app.post(`${baseURL}/`, [validations.addAddress], async (req, res) => {
        try {
            const params = req.body;
            const result = await controller.addAddress(params);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }

    });
};