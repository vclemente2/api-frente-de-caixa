const BaseError = require('./BaseError')

class InternalServerError extends BaseError {
    constructor(message) {
        super(message, 500)
    }
}

module.exports = InternalServerError