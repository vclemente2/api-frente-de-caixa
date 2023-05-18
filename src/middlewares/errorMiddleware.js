const errorMiddleware = (error, req, res, next) => {
    console.log(error)
    if (error.name === 'ValidationError') {
        return res.status(422).json({ mensagem: error.message })
    }

    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
    }

    if (error.name === 'MulterError') {
        return res.status(400).json({ mensagem: 'É necessátrio informar a propriedade imagem' })
    }

    const status = error.statusCode || 500
    const message = error.statusCode ? error.message : 'Erro interno do servidor.'

    return res.status(status).json({ mensagem: message })
}

module.exports = errorMiddleware
