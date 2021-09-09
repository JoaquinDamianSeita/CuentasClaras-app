const operationService = require("../services/operation");

class OperationController {
  constructor() {}

  async controllerOperationCR(req, res, next) {
    try {
      if (
        !req.body.amount ||
        !req.body.concept ||
        !req.body.type ||
        !req.body.userId ||
        !req.body.categoryId
      ) {
        throw new Error("Hay campos vacios en la creación!");
      }
      let createdOperation = await operationService.createOperation(req.body);
      res.status(200).json(createdOperation);
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
  async controllerOperationU(req, res, next) {
    try {
      if (!req.body.id) {
        throw new Error("Debes proporcionar un id de la operación");
      }

      let operation = await operationService.updateOperation(req.body);

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

      let operation = await operationService.deleteOperation(req.params.operationId);

      res.status(200).json(operation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new OperationController();
