const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => { res.json('server is running') });

routes.use(() => { }); // intermediário de autenticação

module.exports = routes;