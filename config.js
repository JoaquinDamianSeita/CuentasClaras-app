require("dotenv").config();

module.exports = {
    database: {
        username: "root",
        password: process.env.DB_PASSWORD,
        database: "alkemy_test",
        host: "localhost"
    }

}