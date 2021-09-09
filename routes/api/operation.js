const router = require("express").Router();

const {
  controllerOperationCR,
  controllerOperationRA,
  controllerOperationRO,
  controllerOperationU,
  controllerOperationD,
  controllerOperationRB,
} = require("../../database/controller/operation");



router
  .get("/allOperations/:userId", controllerOperationRA)
  .get("/oneOperation/:userId/:operationId", controllerOperationRO)
  .get("/balance/:userId", controllerOperationRB)
  .post("/", controllerOperationCR)
  .put("/:operationID", controllerOperationU)
  .delete("/:operationId", controllerOperationD)
  

module.exports = router;
