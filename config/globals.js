//IMPORTO TODAS LAS VARIABLES GLOBALES SOLO UNA VEZ

require("dotenv").config();

if (process.env.ENTORNO === "PROD") {
  module.exports = { CLIENTORIGIN: process.env.CLIENTORIGIN };
}

module.exports = {
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  PORT: process.env.PORT || 3001,
  SECRET_JWT: process.env.SECRET_JWT,
};
