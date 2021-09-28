const bcrypt = require("bcryptjs");
const jwtTools = require("../../utils/jwtTools");

const UserDAO = require("../models/dao/user");

class UserController {
  constructor() {}

  async userRegister(req, res, next) {
    try {
      const { username, email } = req.body;
      let { password } = req.body;

      if (!username || !email || !password) {
        throw new Error("Hay campos vacios en la creación!");
      }

      // Uso bcrypt para encriptar la contraseña del usuario antes de guardarlo en la db
      password = await bcrypt.hash(password, 10);

      const userCreated = {
        username: username,
        email: email,
        password: password,
      };

      // Si sale todo bien envio un mensaje al cliente
      await UserDAO.createUser(userCreated);
      res.status(200).json(`User registered!`);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async userLogin(req, res, next) {
    try {
      const user = await UserDAO.findUser(req.body.email);

      /* Si existe un usuario con el mail comparo las contraseñas con bcrypt
      lo bueno es que de esta forma nunca se revela cual es la contraseña del usuario
      solo se compara con el algoritmo */
      if (user) {
        const iguales = await bcrypt.compare(req.body.password, user.password);
        console.log(user.id);

        /* Si coinciden envio un token al cliente con el id del usuario y su username  */
        if (iguales) {
          res
            .status(200)
            .json({
              Token: await jwtTools.createToken(user.id),
              Username: user.username,
            });
        } else {
          res.status(401).json({ error: "Error en usuario y/o contraseña" });
        }
      } else {
        res.status(401).json({ error: "Error en usuario y/o contraseña" });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
