const { Router } = require('express');
const uniqueEmail = require('../middlewares/uniqueEmail');
const { createUser, listCategory } = require('../controllers/userController');
const validateUser = require('../middlewares/userValidation');
const userRegistration = require('../schema/userRegistration');

const routes = Router();

routes.get('/', (req, res) => { res.json('server is running') });
routes.get('/categoria', listCategory)

routes.post('/usuario', validateUser(userRegistration), uniqueEmail, createUser);

routes.use(() => { }); // intermediário de autenticação


module.exports = routes;