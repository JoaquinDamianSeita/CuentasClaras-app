const moment = require("moment");
const jwt = require("jwt-simple");
const {SECRET_JWT} = require("../config/globals");

class jwtTools {
  async createToken(userId) {
    try {
      const payload = {
        usuarioId: userId,
        createdAt: moment().unix(),
        expiredAt: moment().add(24, "hours").unix(),
      };

      const jwtCreated = jwt.encode(payload, SECRET_JWT);
      return jwtCreated;

    } catch (error) {
      return error;
    }
  }
}

module.exports = new jwtTools();
