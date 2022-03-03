import 'dotenv/config';
import ValidateException from '../exceptions/validate';
import controller from '../controllers/state';

const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /state:
 *   get:
 *     tags:
 *     - Address
 *     summary: Buscar estados.
 *     responses:
 *       200:
 *         description: Lista de estados.
 */
router.get('', async(req, res) => {
    try {
        const params = {
            ...req.params,
            ...req.query,
        };
        const result = await controller.listStates(params);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res
            .status(400)
            .send(new ValidateException(400, 'Erro ao processar solicitação!', req.url, e.errors));
    }
});

module.exports = router;