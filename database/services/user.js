const UserDAO = require("../models/dao/user");


class userService {
    constructor(){}
    async createUser(user){
        return await UserDAO.createUser(user);
    }
    async findUser(userMail){
        return await UserDAO.findUser(userMail);
    }
}

module.exports = new userService();