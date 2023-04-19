const BaseError = require('./BaseError')

class ConflictError extends BaseError {
    constructor(message) {
        super(message, 409)
    }
}

module.exports = ConflictError
