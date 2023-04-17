const { Router } = require('express');
const uniqueEmail = require('../middlewares/uniqueEmail');
const { createUser } = require('../controllers/userController');

const routes = Router();

routes.get('/', (req, res) => { res.json('server is running') });

routes.post('/usuario', uniqueEmail, createUser);

routes.use(() => { }); // intermediário de autenticação


module.exports = routes;