
// ESTE ARCHIVO CONTIENE LAS CONFIGURACIONES DE LA BASE DE DATOS

const {DB_PASSWORD, DB_USERNAME, DB_NAME, DB_HOST} = require("../../config/globals");


module.exports = {
    database: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST
    }
}
