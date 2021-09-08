const operationModel = require("../schemas/Operation");
const Category = require("../schemas/Category");


class operationDAO {
  async createOperation({ amount, concept, type, userId, categoryId }) {
    try {
      const operation = await operationModel.create({
        amount,
        concept,
        type,
        userId,
        categoryId,
      });
      return operation;
    } catch (error) {
      console.log(error);
    }
  }
  async allOperations(selectedUserId) {
    try {
      const operations = await operationModel.findAll({
        where: { userId: selectedUserId },
        attributes: ["amount", "concept", "type", "id"],
        include: {
          model: Category,
          as: "category",
          attributes: ["type"],
        },
      });
      return operations;
    } catch (error) {
      console.log(error);
    }
  }
  async oneOperation(selectedUserId, selectedOperationId) {
    try {
      const operation = await await operationModel.findOne({
        where: { userId: selectedUserId, id: selectedOperationId },
        attributes: ["amount", "concept", "type", "id"],
        include: {
          model: Category,
          as: "category",
          attributes: ["type"],
        },
      });
      return operation;
    } catch (error) {
      console.log(error);
    }
  }

  async updateOperation({ amount, concept, selectedOperationId }) {
    try {
      await operationModel.update(
        { amount, concept },
        {
          where: { id: selectedOperationId },
        }
      );
      return "Modificado con exito!";
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOperation({ selectedOperationId }) {
    try {
      await Operation.destroy({
        where: { id: selectedOperationId },
      });
      return "Eliminado con exito";
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new operationDAO();
