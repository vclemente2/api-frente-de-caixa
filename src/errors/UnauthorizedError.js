const BaseError = require('./BaseError')

class UnauthorizedError extends BaseError {
    constructor(message) {
        super(message, 401)
    }
}

module.exports = UnauthorizedError
