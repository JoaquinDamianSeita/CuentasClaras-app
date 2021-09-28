
// ACA COMPRUEBO QUE EL TOKEN SEA VALIDO Y NO ESTE VENCIDO

const jwt = require("jwt-simple");
const moment = require("moment");

const { SECRET_JWT } = require("../config/globals");

const checkToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.json({
      error: "Necesitas incluir el user token en la cabecera",
    });
  }

  const userToken = req.headers["authorization"];
  let payload = {};
  try {
    payload = jwt.decode(userToken, SECRET_JWT);
  } catch (error) {
    return res.json({ error: "El token es incorrecto" });
  }

  if (payload.expiredAt < moment().unix()) {
    return res.json({ error: "El token ha expirado" });
  }

  // SI TODO SALE BIEN LO ENVIO AL CONTROLADOR
  req.usuarioId = payload.usuarioId;
  next();
};

module.exports = checkToken;
