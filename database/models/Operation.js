const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Operation extends Model {}
Operation.init(
  {
    monto: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    concepto: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    tipo: {
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
