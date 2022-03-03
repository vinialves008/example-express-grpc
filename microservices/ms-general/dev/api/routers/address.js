import 'dotenv/config';
import ValidateException from '../exceptions/validate';
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

module.exports = router;