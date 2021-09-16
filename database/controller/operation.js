const operationService = require("../services/operation");

class OperationController {
  constructor() {}

  async controllerOperationCR(req, res, next) {
    try {
      if (
        !req.body.data.amount ||
        !req.body.data.concept ||
        !req.body.data.type ||
        !req.body.data.userId ||
        !req.body.data.categoryId
      ) {
        throw new Error("Hay campos vacios en la creación!");
      }
      let createdOperation = await operationService.createOperation(req.body.data);
      let responseOperation = await operationService.oneOperation(createdOperation.userId, createdOperation.id);

      res.status(200).json(responseOperation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async controllerOperationRA(req, res, next) {
    try {
      if (!req.params.userId) {
        throw new Error("Debes proporcionar un userId");
      }

      let operations = await operationService.allOperations(req.params.userId);
      res.status(200).json(operations);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async controllerOperationRO(req, res, next) {
    try {
      if (!req.params.operationId || !req.params.userId) {
        throw new Error("Debes proporcionar un userId y un operationId");
      }
      const { userId, operationId } = req.params;

      let operation = await operationService.oneOperation(userId, operationId);
      res.status(200).json(operation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async controllerOperationRB(req, res, next) {
    try {
      if (!req.params.userId) {
        throw new Error("Debes proporcionar un userId");
      }

      let balance = await operationService.balanceOperations(req.params.userId);
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
      let operation = await operationService.updateOperation(req.body.data);

      
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

      let operation = await operationService.deleteOperation(
        req.params.operationId
      );

      res.status(200).json(operation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new OperationController();
