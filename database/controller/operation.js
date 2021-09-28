
//CONTROLLER DE LAS OPERACIONES

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
        //Adjunto al objeto el usuario id que recupero del token
        userId: req.usuarioId,
        categoryId: req.body.data.categoryId,
      };

      let createdOperation = await OperationDAO.createOperation(sendOperation);

      //Compurebo que se creo correctamente la operacion y la envio al cliente
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

      //Recupero el usuario id del token si esta bien lo envio al cliente
      let operations = await OperationDAO.allOperations(req.usuarioId);
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

      //Recupero id del usuario del token y el id de la operacion de los params
      const { operationId } = req.params;
      const userId = req.usuarioId;

      //Si coinciden lo envio al cliente
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

      //Recupero el id del usuario del token, si existe leo el balance y lo envio al cliente
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
        //Adjunto al objeto el usuario id que recupero del token
        userId: req.usuarioId,
      };

      //Si se actualiza correctamente lo envio al cliente
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

      //Recupero el id del usuario del token
      const userId = req.usuarioId;

      // Si sale todo bien envio la respuesta al cliente
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
