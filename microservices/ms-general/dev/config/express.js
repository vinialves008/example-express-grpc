import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import address from '../api/routers/address';
import city from '../api/routers/city';
import contact from '../api/routers/contact';
import country from '../api/routers/country';
import state from '../api/routers/state';

import 'dotenv/config';

module.exports = () => {
    const app = express();

    // SETANDO VARIÁVEIS DA APLICAÇÃO
    app.set('port', process.env.PORT || 3000);

    // MIDDLEWARES
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors());

    // Import routers
    app.use(`${process.env.BASE_URL || '/'}/address`, address);
    app.use(`${process.env.BASE_URL || '/'}/city`, city);
    app.use(`${process.env.BASE_URL || '/'}/contact`, contact);
    app.use(`${process.env.BASE_URL || '/'}/country`, country);
    app.use(`${process.env.BASE_URL || '/'}/state`, state);

    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API base Postgres + Express API + GRPC with Swagger',
                version: '0.1.0',
                description: 'This is a simple CRUD API application made with Express and documented with Swagger',
            },
            servers: [{
                url: `http://localhost:${process.env.BASE_URL}`,
            }, ],
            components: {
                securitySchemes: {
                    Authorization: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                        in: 'header',
                    },
                },
            },
        },
        apis: ['dev/api/routers/*.js'],
    };
    const specs = swaggerJsdoc(options);

    // Inclusão de documentação Swagger
    app.use(
        `${process.env.BASE_URL || '/api-docs'}/api-docs`,
        swaggerUi.serve,
        swaggerUi.setup(specs)
    );

    // Inclusão de rota não encontrada
    app.use((req, res, next) => {
        res.status(404).send({
            status: 404,
            message: 'Not found',
        });
    });

    return app;
};