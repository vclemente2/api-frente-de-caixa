module.exports = {
    valid: {
        nome: 'Vinicius',
        email: 'v@v.com.',
        senha: 'abc123'
    },
    valid_two: {
        nome: 'Teste',
        email: 't@t.com.',
        senha: 'abc123'
    },
    invalid_noName: {
        email: 'v@v.com.',
        senha: 'abc123'
    },
    invalid_noSenha: {
        nome: 'Vinicius',
        email: 'v@v.com.'
    },
    invalid_noEmail: {
        nome: 'Vinicius',
        senha: 'abc123'
    },
}