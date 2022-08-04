class Users {
    constructor(id, createdAt, email, fullname, last_loggedin) {
            this.id = id;
            this.createdAt = createdAt;
            this.email = email;
            this.fullname = fullname;
            this.last_loggedin = last_loggedin;
    }
}

module.exports =  Users;