// ESTE ARCHIVO CONECTA LA BASE DE DATOS CON LA APP

const sequelize = require("./db");
const Models = require("../models/schemas/index");
const Category = require("../../database/models/schemas/Category");
require("./associations");

const Categories = [
  { type: "Alimentación" },
  { type: "Transporte" },
  { type: "Educación" },
  { type: "Entretenimiento" },
  { type: "Facturas" },
  { type: "Hogar" },
  { type: "Nafta" },
  { type: "Ropa" },
  { type: "Salud" },
  { type: "Inversiones" },
  { type: "Otros" },
  { type: "Premios" },
  { type: "Regalos" },
  { type: "Sueldo" },
];

exports.GetConnected = async () => {
  // Force true: DROP TABLES
  
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Nos hemos conectado a la base de datos");
    })

    //SI CATEGORIAS ESTA VACIA LA COMPLETA AUTOMATICAMENTE
    .then(async () => {
      let categories = await Category.findAll();
      if (categories.length === 0) {
        Categories.forEach((category) => Category.create(category));
      }
    })
    .catch((error) => {
      console.log("Se ha producido un error", error);
    });
};
