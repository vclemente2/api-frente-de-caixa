const express = require('express');

const router = express.Router();

router.post('/usuario')//cadastro de usuario

// as rotas abaixo precisam de autenticação
router.use('função validar login');

module.exports = router;