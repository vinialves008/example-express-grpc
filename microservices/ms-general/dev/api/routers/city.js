import 'dotenv/config';
import ValidateException from '../utils/validate';
import controller from '../controllers/city';
import validations from '../validations/city';

const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /city/{id}/state:
 *   get:
 *     tags:
 *     - City
 *     summary: Buscar cidades com base em um estado.
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID do estado.
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Lista de estados.
 */
router.get('/:id/state', [validations.listCitiesInState], async(req, res) => {
    const params = {
        ...req.params,
        ...req.query,
    };

    try {
        const result = await controller.listCitiesInState(params);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res
            .status(400)
            .send(new ValidateException(400, 'Erro ao processar solicitação!', req.url, e.errors));
    }
});

module.exports = router;