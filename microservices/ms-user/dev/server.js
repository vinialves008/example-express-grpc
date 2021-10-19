const app = require('./config/express')();
const port = app.get('port');

import './database';

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`)
});
