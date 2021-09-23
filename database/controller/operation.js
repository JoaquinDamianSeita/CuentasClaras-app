const OperationDAO = require("../models/dao/operation");

class OperationController {
  constructor() {}

  async controllerOperationCR(req, res, next) {
    try {
      if (
        !req.body.data.amount ||
        !req.body.data.concept ||
        !req.body.data.type ||
        !req.usuarioId ||
        !req.body.data.categoryId
      ) {
        throw new Error("Hay campos vacios en la creación!");
      }

      const sendOperation = {
        amount: req.body.data.amount,
        concept: req.body.data.concept,
        type: req.body.data.type,
        userId: req.usuarioId,
        categoryId: req.body.data.categoryId,
      };

      let createdOperation = await OperationDAO.createOperation(sendOperation);

      console.log(createdOperation);

      let responseOperation = await OperationDAO.oneOperation(
        createdOperation.userId,
        createdOperation.id
      );

      res.status(200).json(responseOperation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async controllerOperationRA(req, res, next) {
    try {
      if (!req.usuarioId) {
        throw new Error("Debes proporcionar un userId");
      }
      let categoryId = null;

      if(req.query.categoryId){
        categoryId = req.query.categoryId;
      }

      let operations = await OperationDAO.allOperations(req.usuarioId, categoryId);
      res.status(200).json(operations);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async controllerOperationRO(req, res, next) {
    try {
      if (!req.params.operationId) {
        throw new Error("Debes proporcionar un operationId");
      }
      const { operationId } = req.params;
      const userId = req.usuarioId;

      let operation = await OperationDAO.oneOperation(userId, operationId);
      res.status(200).json(operation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async controllerOperationRB(req, res, next) {
    try {
      if (!req.usuarioId) {
        throw new Error("Debes proporcionar un userId");
      }

      let balance = await OperationDAO.balanceOperations(req.usuarioId);
      res.status(200).json(balance);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async controllerOperationU(req, res, next) {
    try {
      if (!req.body.data.id) {
        throw new Error("Debes proporcionar un id de la operación");
      }

      const sendOperation = {
        id: req.body.data.id,
        amount: req.body.data.amount,
        concept: req.body.data.concept,
        userId: req.usuarioId,
      };
      let operation = await OperationDAO.updateOperation(sendOperation);

      res.status(200).json(operation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async controllerOperationD(req, res, next) {
    try {
      if (!req.params.operationId) {
        throw new Error("Debes proporcionar un id de la operación");
      }

      const userId = req.usuarioId;

      let operation = await OperationDAO.deleteOperation({
        operationId: req.params.operationId,
        userId,
      });

      res.status(200).json(operation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new OperationController();
