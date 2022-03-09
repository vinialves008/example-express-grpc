export class Validate {
    constructor(status, message, path, errors = []) {
        this.status = status;
        this.message = message;
        this.path = path;
        this.errors = errors;
    }
}