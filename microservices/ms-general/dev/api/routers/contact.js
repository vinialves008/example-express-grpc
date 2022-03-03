import 'dotenv/config';
import ValidateException from '../exceptions/validate';
import controller from '../controllers/contact';
import validations from '../validations/contact';

const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /contact/{id}:
 *   get:
 *     tags:
 *     - Contact
 *     summary: Busca contato.
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID do contato.
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Contato.
 *       400:
 *         description: Erro ao buscar contato.
 */
router.get('/:id', [validations.findOneContact], async(req, res) => {
    try {
        const params = req.params;
        const result = await controller.findOneContact(params);

        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        const status = e.status || 400;
        res.status(status).send(new ValidateException(status, e.message, req.url, e.errors));
    }
});

router.post('', [validations.addContact], async(req, res) => {
    try {
        const params = req.body;
        const result = await controller.addContact(params);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res
            .status(400)
            .send(new ValidateException(400, 'Erro ao processar solicitação!', req.url, e.errors));
    }
});

module.exports = router;