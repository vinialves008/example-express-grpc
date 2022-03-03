class ObjectNotFoundException extends Error {
    constructor(message, errors = []) {
        super(message);
        this.status = 404
        this.message = message
        this.errors = errors
    }
}

module.exports = { ObjectNotFoundException }