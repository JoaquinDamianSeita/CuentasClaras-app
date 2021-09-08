require('dotenv').config();

module.exports = {
    DB_PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.PORT || 3001,
    SECRET_JWT: process.env.SECRET_JWT
};