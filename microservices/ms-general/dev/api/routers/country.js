import 'dotenv/config';
import ValidateException from '../exceptions/validate';
import FieldMessageException from '../exceptions/fieldmessage';
import controller from '../controllers/country';
import validations from '../validations/country';

const express = require('express');

const router = express.Router();

router.get('', async(req, res) => {
    const params = {
        ...req.params,
        ...req.query,
    };

    try {
        const result = await controller.listCountries(params);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res
            .status(400)
            .send(new ValidateException(400, 'Erro ao processar solicitação!', req.url, e.errors));
    }
});

module.exports = router;