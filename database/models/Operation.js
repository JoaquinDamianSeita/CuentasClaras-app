const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Operation extends Model {}
Operation.init(
  {
    amount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    concept: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "operation",
  }
);

module.exports = Operation;
