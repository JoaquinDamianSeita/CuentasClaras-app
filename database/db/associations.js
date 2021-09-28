
//EN ESTE ARCHIVO SE ESTABLECEN LAS RELACIONES DE LA BASE DE DATOS

const Category = require("../models/schemas/Category");
const Operation = require("../models/schemas/Operation");
const User = require("../models/schemas/User");

User.hasMany(Operation, { as: "operations", foreignKey: "userId"});
Operation.belongsTo(User, { as: "user"});
Category.hasMany(Operation, { as: "operations" })
Operation.belongsTo(Category, { as: "category" });

