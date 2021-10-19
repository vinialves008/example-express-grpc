const app = require('./config/express')();
//const server = require('./api/services/grpc-server')();
const server = require('./config/grpc-server')();
const port = app.get('port');
const grpc = require('grpc');
import 'dotenv/config';

import './database';
import './api/services/address';

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
    console.log(`🚀 Servidor Express rodando na porta ${port}`)
});

server.bindAsync(
  `0.0.0.0:${process.env.GRPC_GENERAL_PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log(`🚀 Server GRPC running at http://0.0.0.0:${process.env.GRPC_GENERAL_PORT}`);
    server.start();
  }
);