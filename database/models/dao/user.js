const User = require("../schemas/User");

class userDAO {
  async createUser(user) {
    try {
      let userCreated = await User.create(user);

      if (userCreated.length === 0) {
        throw new Error(`Fallo al guardar`);
      }

      return userCreated;
    } catch (error) {
      throw new Error(`Ocurrio un error en el DAO Create ${error}`);
    }
  }

  async findUser(userEmail) {
    try {
      const user = await User.findOne({ where: { email: userEmail } });
      if (user.length === 0) {
        throw new Error(`Fallo al buscar el usuario`);
      }
      return user;
    } catch (error) {
      throw new Error(`Ocurrio un error en el DAO Read ${error}`);
    }
  }
}

module.exports = new userDAO();
