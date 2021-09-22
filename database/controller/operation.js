const operationService = require("../services/operation");

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

      let createdOperation = await operationService.createOperation(
        sendOperation
      );

      console.log(createdOperation);

      let responseOperation = await operationService.oneOperation(
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

      let operations = await operationService.allOperations(req.usuarioId);
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

      let operation = await operationService.oneOperation(userId, operationId);
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

      let balance = await operationService.balanceOperations(req.usuarioId);
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
      let operation = await operationService.updateOperation(sendOperation);

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

      let operation = await operationService.deleteOperation({
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
