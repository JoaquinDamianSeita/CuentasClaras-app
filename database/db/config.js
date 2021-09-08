const {DB_PASSWORD} = require("../../config/globals");

module.exports = {
    database: {
        username: "root",
        password: DB_PASSWORD,
        database: "alkemy_test",
        host: "localhost"
    }

}