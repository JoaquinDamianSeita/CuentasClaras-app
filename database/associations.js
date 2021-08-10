const Category = require("./models/Category");
const Operation = require("./models/Operation");
const User = require("./models/User");


User.hasMany(Operation, { as: "operations", foreignKey: "userId"});
Operation.belongsTo(User, { as: "user"});
Category.hasMany(Operation, { as: "operations" })
Operation.belongsTo(Category, { as: "category" });

