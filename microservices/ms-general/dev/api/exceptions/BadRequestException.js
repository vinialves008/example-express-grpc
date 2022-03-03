class BadRequestException extends Error {
    constructor(message, errors = []) {
        super(message);
        this.status = 400
        this.message = message
        this.errors = errors
    }
}

module.exports = { BadRequestException }