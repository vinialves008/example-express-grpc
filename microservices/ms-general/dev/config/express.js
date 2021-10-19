
import express from 'express';
import consign from 'consign';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../config/swagger.json';

import 'dotenv/config';
const grpc = require('grpc');

module.exports = () => {
    const app = express();
    const server = new grpc.Server();

    if (process.env.API_ADDRESS) {
        const [scheme, host] = process.env.API_ADDRESS.split('://');
        swaggerDocument.host = host;
        swaggerDocument.schemes.unshift(scheme);
    }

    // SETANDO VARIÁVEIS DA APLICAÇÃO
    app.set('port', process.env.PORT || 3000);

    // MIDDLEWARES
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))

    app.use(cors());

    if (process.env.MODE !== "PROD") {
        app.use(`${process.env.BASE_URL}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.get(`${process.env.BASE_URL}/api-docs`, swaggerUi.setup(swaggerDocument));
    }



    consign({ cwd: `${process.env.MODE}/api` })
        .then(`resources`)
        .into(app);

    return app;
};
