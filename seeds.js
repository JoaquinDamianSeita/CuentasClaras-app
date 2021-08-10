const sequelize = require("./database/db");
const User = require("./database/models/User");
const Operation = require("./database/models/Operation");
const Category = require("./database/models/Category");
require("./database/associations");

const Users = [
    { username: "Joaquin", email: "joaquin@mail.com", password: "qwerty" },
    { username: "Florencia", email: "florencia@mail.com", password: "123456" },
    { username: "Jose", email: "jose@mail.com", password: "654321" },
];

const Categories = [
    { type: "Comida" },
    { type: "Transporte" },
    { type: "Trabajo" },
];

const Operations = [
    { monto: 1200, concepto: "Burguer", tipo:"Egreso", userId: 1, categoryId: 1 },
    { monto: 500, concepto: "Trabajo", tipo:"Ingreso", userId: 1, categoryId: 3 },
    { monto: 100, concepto: "Sube", tipo:"Egreso", userId: 1, categoryId: 2 },
    { monto: 1200, concepto: "Burguer", tipo:"Egreso", userId: 2, categoryId: 1 },
    { monto: 6000, concepto: "Salario", tipo:"Ingreso", userId: 2, categoryId: 3 },
    { monto: 1200, concepto: "Burguer", tipo:"Egreso", userId: 3, categoryId: 1 },
    { monto: 500, concepto: "Trabajo", tipo:"Ingreso", userId: 3, categoryId: 3 },
    { monto: 100, concepto: "Sube", tipo:"Egreso", userId: 3, categoryId: 2 },
];

sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Nos hemos conectado a la base de datos");
    })
    .catch((error) => {
      console.log("Se ha producido un error", error);
    })
    .then(() => {
        Users.forEach( user => User.create(user));
    })
    .then(() => {
        Categories.forEach( category => Category.create(category));
    })
    .then(() => {
        Operations.forEach( operation => Operation.create(operation));
    })