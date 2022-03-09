import 'dotenv/config';
import { Validate } from '../utils/validate';
import controller from '../controllers/user';
import validationsCreate from '../validations/UserCreate';

const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *     - User
 *     summary: Buscar usuários.
 *     responses:
 *       200:
 *         description: Lista de usuários.
 */
router.get(``, [], async(req, res) => {
    try {
        const params = req.params;
        const result = await controller.fetchUsers(params);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        const status = e.status || 400;
        res.status(status).send(new Validate(status, e.message, req.url, e.errors));
    }
});

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *     - User
 *     summary: Inserir usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/UserNewDTO'
 *     responses:
 *       201:
 *         description: Inserir usuário.
 */
router.post(``, [validationsCreate], async(req, res) => {
    try {
        const params = req.body;
        const result = await controller.createUsers(params);
        res.status(201).send(result);
    } catch (e) {
        console.log(e);
        const status = e.status || 400;
        res.status(status).send(new Validate(status, e.message, req.url, e.errors));
    }
});

module.exports = router;