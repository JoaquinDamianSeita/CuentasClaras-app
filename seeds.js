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
    { amount: 1200, concept: "Burguer", type:"Egreso", userId: 1, categoryId: 1 },
    { amount: 500, concept: "Trabajo", type:"Ingreso", userId: 1, categoryId: 3 },
    { amount: 100, concept: "Sube", type:"Egreso", userId: 1, categoryId: 2 },
    { amount: 1200, concept: "Burguer", type:"Egreso", userId: 2, categoryId: 1 },
    { amount: 6000, concept: "Salario", type:"Ingreso", userId: 2, categoryId: 3 },
    { amount: 1200, concept: "Burguer", type:"Egreso", userId: 3, categoryId: 1 },
    { amount: 500, concept: "Trabajo", type:"Ingreso", userId: 3, categoryId: 3 },
    { amount: 100, concept: "Sube", type:"Egreso", userId: 3, categoryId: 2 },
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