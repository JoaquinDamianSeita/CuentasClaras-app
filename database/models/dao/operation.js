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

      if (operation.length === 0) {
        throw new Error(`Fallo al guardar`);
      }

      return operation;
    } catch (error) {
      throw new Error(`Ocurrio un error en el DAO Create ${error}`);
    }
  }
  async allOperations(selectedUserId, categoryId) {
    try {
      let operations = [];

      if (categoryId) {
        operations = await operationModel.findAll({
          where: { userId: selectedUserId, categoryId: categoryId },
          attributes: ["amount", "concept", "type", "id"],
          include: {
            model: Category,
            as: "category",
            attributes: ["type"],
          },
        });
        if (operations.length === 0) {
          return [];
        }
        return operations;
      } else {
        operations = await operationModel.findAll({
          where: { userId: selectedUserId },
          attributes: ["amount", "concept", "type", "id"],
          include: {
            model: Category,
            as: "category",
            attributes: ["type"],
          },
        });

        if (operations.length === 0) {
          return [];
        }
        return operations;
      }
    } catch (error) {
      throw new Error(`Ocurrio un error en el DAO ReadAll ${error}`);
    }
  }
  async balanceOperations(selectedUserId) {
    try {
      const operations = await operationModel.findAll({
        where: { userId: selectedUserId },
        attributes: ["amount", "type"],
      });
      let balance = 0;

      if (operations.length === 0) {
        return balance;
      }

      operations.forEach((operation) => {
        if (operation.type === "Egreso") {
          balance = balance - parseInt(operation.amount);
        }
        if (operation.type === "Ingreso") {
          balance = balance + parseInt(operation.amount);
        }
      });

      return balance;
    } catch (error) {
      throw new Error(`Ocurrio un error en el DAO Balance ${error}`);
    }
  }
  async oneOperation(selectedUserId, selectedOperationId) {
    try {
      const operation = await operationModel.findOne({
        where: { userId: selectedUserId, id: selectedOperationId },
        attributes: ["amount", "concept", "type", "id"],
        include: {
          model: Category,
          as: "category",
          attributes: ["type"],
        },
      });

      if (operation.length === 0) {
        throw new Error(`Fallo al buscar una operacion`);
      }

      return operation;
    } catch (error) {
      throw new Error(`Ocurrio un error en el DAO oneOperation ${error}`);
    }
  }
  async updateOperation({ amount, concept, id, userId }) {
    try {
      await operationModel.update(
        { amount, concept },
        {
          where: { id: id, userId: userId },
        }
      );
      return { msg: "Modificado con exito!" };
    } catch (error) {
      throw new Error(`Ocurrio un error en el DAO updateOperation ${error}`);
    }
  }
  async deleteOperation({ operationId, userId }) {
    try {
      let deleted = await operationModel.destroy({
        where: { id: operationId, userId: userId },
      });
      if (deleted === 0) {
        throw new Error(`Fallo al eliminar la operacion`);
      } else {
        return { msg: "Se elimino el elemento con exito!" };
      }
    } catch (error) {
      throw new Error(`Ocurrio un error en el DAO deleteOperation ${error}`);
    }
  }
}

module.exports = new operationDAO();
