const BaseError = require('./BaseError');

class UnprocessableContentError extends BaseError {
    constructor(message) {
        super(message, 422);
    }
}

module.exports = UnprocessableContentError;
