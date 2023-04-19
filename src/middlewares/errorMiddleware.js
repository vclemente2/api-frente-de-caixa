const errorMiddleware = (error, req, res, next) => {

    const status = error.statusCode || 500
    const message = error.statusCode ? error.message : 'Erro interno do servidor.'

    if (
        error.name === 'JsonWebTokenError'
        ||
        error.name === 'TokenExpiredError'
    ) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
    }

    return res.status(status).json({ mensagem: message })
}

module.exports = errorMiddleware
