const express = require('express');
const cors = require('cors');
// const loginRouter = require('../routers/login.routes');
const routers = require('../routers/index');

const app = express();
// Implementação Cors
// const accessControl = (_req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// };

// app.use(accessControl());

app.use(express.json());
app.use(cors()); // Biblioteca com todas as permissões: cors é utilizado para permissões do navegador para solicitar requisições
app.use('/images', express.static('public'));
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(routers);

module.exports = app;
