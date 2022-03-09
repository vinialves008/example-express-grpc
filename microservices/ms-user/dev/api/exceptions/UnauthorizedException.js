class UnauthorizedException extends Error {
    constructor(message, errors = []) {
        super(message);
        this.status = 403
        this.message = message
        this.errors = errors
    }
}

module.exports = { UnauthorizedException }