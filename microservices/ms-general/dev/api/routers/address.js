import 'dotenv/config';
import ValidateException from '../utils/validate';
import controller from '../controllers/address';
import validations from '../validations/address';

const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /address:
 *   post:
 *     tags:
 *     - Address
 *     summary: Adicionar endereço.
 *     responses:
 *       201:
 *         description: Endereço adicionado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Address'
 */
router.post('', [validations.addAddress], async(req, res) => {
    try {
        const params = req.body;
        const result = await controller.addAddress(params);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res
            .status(400)
            .send(new ValidateException(400, 'Não foi possível adicionar endereço!', req.url, e.errors));
    }
});

/**
 * @swagger
 * /address/{id}:
 *   get:
 *     tags:
 *     - Address
 *     summary: Buscar endereço.
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID do endereço.
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Endereço buscado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Address'
 */
router.get('/:id', [], async(req, res) => {
    try {
        const params = req.params;
        const result = await controller.findById(params);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res
            .status(400)
            .send(new ValidateException(400, 'Não foi possível buscar endereço!', req.url, e.errors));
    }
});

module.exports = router;