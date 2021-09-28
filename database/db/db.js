// ACA SE ESTABLECEN LAS CONFIGURACIONES DE SEQUELIZE

const { Sequelize } = require("sequelize");

const { database } = require("./config");

const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  {
    host: database.host,
    dialect: "mysql",
  }
);

module.exports = sequelize;
