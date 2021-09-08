const sequelize = require("./db");
const Models = require("../models/index");
require("./associations");


exports.GetConnected = async () => {
  // Conectase a la base de datos
  // Force true: DROP TABLES
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Nos hemos conectado a la base de datos");
    })
    .catch((error) => {
      console.log("Se ha producido un error", error);
    });
};
