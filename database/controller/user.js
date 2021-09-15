const userService = require("../services/user");
const bcrypt = require("bcryptjs");
const jwtTools = require("../../utils/jwtTools");

class UserController {
  constructor() {}

  async userRegister(req, res, next) {
    try {
      const { username, email } = req.body;
      let { password } = req.body;

      if (!username || !email || !password) {
        throw new Error("Hay campos vacios en la creación!");
      }

      password = await bcrypt.hash(password, 10);

      const userCreated = {
        username: username,
        email: email,
        password: password,
      };

      await userService.createUser(userCreated);
      res.status(200).json(`User registered!`);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async userLogin(req, res, next) {
    try {
      const user = await userService.findUser(req.body.email);

      if (user) {
        const iguales = await bcrypt.compare(req.body.password, user.password);

        if (iguales) {
          res.status(200).json({ success: await jwtTools.createToken(user) });
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
