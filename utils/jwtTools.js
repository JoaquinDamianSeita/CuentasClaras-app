const moment = require("moment");
const jwt = require("jwt-simple");
const {SECRET_JWT} = require("../config/globals");

class jwtTools {
  async createToken(user) {
    try {
      const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(1, "minutes").unix(),
      };

      const jwtCreated = jwt.encode(payload, SECRET_JWT);
      return jwtCreated;

    } catch (error) {
      return error;
    }
  }
}

module.exports = new jwtTools();
