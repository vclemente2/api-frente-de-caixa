const { Router } = require('express');
const { obterUsuario } = require('../controllers/userController');

const routes = Router();

routes.get('/', (req, res) => { res.json('server is running') });

routes.use(() => { }); // intermediário de autenticação
routes.get('/usuario',obterUsuario)

module.exports = routes;