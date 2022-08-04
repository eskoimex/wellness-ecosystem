class Registration {
    constructor(id, firstName, lastName, email, phoneNumber, password) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.password = password;
    }
}


class Login {
    constructor(email, password) {
            this.email = email;
            this.password = password;
    }
}


module.exports = { Registration, Login };