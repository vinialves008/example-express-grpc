export class UserDTO {
    constructor(user, address) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.address = address;
    }
}